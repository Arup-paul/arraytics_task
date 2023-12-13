import React, {useEffect, useState} from 'react';
import AuthUser from "../../Components/AuthUser";
import {json, Link} from "react-router-dom";

import Pagination from "react-js-pagination";
import {toast} from "react-toastify";

import DataTable from 'react-data-table-component';
const Index = () => {
    const {http} = AuthUser();
    const [report,setReport] = useState()
    const [page,setPage] = useState(1)
    const [searchText, setSearchText] = useState('');
    const getData = (pageNumber = 1) => {
        http.get(`/address-book?page=${pageNumber}`)
            .then(res => {
            setPage(pageNumber)
            setReport(res?.data?.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getData(1)
    }, []);

    const onDelete = (id) => {
        if(!window.confirm(`Are you sure you want to delete this data?`)){
            return false;
        }
        http.delete(`/address-book/${id}`)
            .then((res) => {
                toast.success(res?.data?.message);
                getData(page)
            })
    }
    const handleFilterChange = (e) => {
        const value = e.target.value || '';
        setSearchText(value);
    };

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: true,
        },
        {
            name: 'Website',
            selector: row => row.website,
            sortable: true,
        },
        {
            name: 'Gender',
            selector: row => row.gender,
            sortable: true,
        },
        {
            name: 'Age',
            selector: row => row.age,
            sortable: true,
        },
        {
            name: 'Nationality',
            selector: row => row.nationality,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => row.action,
            sortable: true,
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#3498db', // Set your desired background color
                color: '#fff', // Set the text color
                fontSize: '16px', // Adjust the font size
                fontWeight: 'bold', // Set the font weight
            },
        },
    };

    const data =  report?.data?.length > 0 ? report?.data?.map((item, index) => ({
        name: item?.name,
        email: item?.email,
        phone: item?.phone,
        website: item?.website,
        gender: item?.gender,
        age: item?.age,
        nationality: item?.nationality,
        action: <div>
            <Link to={`/address-book/edit/${item?.id}`}
                  className="btn btn-info text-white btn-sm mx-1">Edit</Link>
            <button onClick={e => onDelete(item?.id)} className="btn btn-danger btn-sm ml-1 ">
                Delete</button>
        </div>
       })) : []


    const filteredItems = data.filter(item => item.name && item.name.toLowerCase().includes(searchText.toLowerCase()));





    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between mb-2">
                <h4>Address Book</h4>
                <Link to='/address-book/create' className="btn btn-primary">Add New</Link>

            </div>

            <DataTable
                columns={columns}
                data={filteredItems}
                customStyles={customStyles}
                subHeader
                subHeaderComponent={
                    <input
                        type="text"
                        className="form-control w-25"
                        placeholder="Search..."
                        value={searchText}
                        onChange={handleFilterChange}
                    />
                }
            />

            <div className="mt-2 justify-content-center d-flex">

                <Pagination
                    activePage={report?.current_page ? report?.current_page : 0}
                    itemsCountPerPage={report?.per_page ? report?.per_page : 0}
                    totalItemsCount={report?.total ? report?.total : 0}
                    onChange={(pageNumber) => {
                        getData(pageNumber)
                    }}
                    pageRangeDisplayed={8}
                    itemClass="page-item"
                    linkClass="page-link"

                />


            </div>
        </div>


    );
};

export default Index;