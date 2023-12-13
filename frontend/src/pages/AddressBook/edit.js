
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import AuthUser from "../../Components/AuthUser";
import {toast} from "react-toastify";

const Edit = () => {
    const navigate = useNavigate();
    const {http,setToken} = AuthUser();
    const {id} = useParams();

    const [disabled,setDisabled] = useState(false);
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [phone,setPhone] = useState();
    const [website,setWebsite] = useState();
    const [gender,setGender] = useState();
    const [age,setAge] = useState();
    const [nationality,setNationality] = useState();



    const getData = () => {
        http.get('/address-book/'+id+'/edit')
         .then(res => {
             let data = res?.data?.data;
                setName(data?.name);
                setEmail(data?.email);
                setPhone(data?.phone);
                setWebsite(data?.website);
                setGender(data?.gender)
                setAge(data?.age)
                setNationality(data?.nationality)

        }).catch(err => {
            console.log(err)
        })
    }

    const handleSubmit = (e) => {
        setDisabled(false)
        e.preventDefault();
        http.put('/address-book/'+id,{
            name,
            email,
            phone,
            website,
            gender,
            age,
            nationality
        }).then(res => {
            setDisabled(true)
            toast.success(res?.data?.message);
            navigate('/address-book')

        }).catch(err => {
            setDisabled(false)
            const response = err.response;
            if (response && response.status === 422) {
                if (response.data?.errors) {
                    const errors = response.data.errors;
                    for (const key in errors) {
                        toast.error(errors[key][0]);
                    }
                }
            }
            if(response && response.status === 402){
                toast.error(response.data.message);
            }
            if(response && response.status === 500){
                toast.error(response.data.message);
            }
        })
    }


    useEffect(() => {
        getData()
    }, []);
    return (
    <>
        <div className="main-body ">
        <div className="login-container">
            <h4 className="mb-4">Edit Address Book</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text"
                           className="form-control"
                           id="name"
                           placeholder="Enter  Name"
                           value={name}
                           onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email"
                           className="form-control"
                           id="email"
                           placeholder="Enter  Email"
                           value={email}
                           onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text"
                           className="form-control"
                           id="phone"
                           placeholder="Enter  Phone"
                           value={phone}
                           onChange={e => setPhone(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="website" className="form-label">Website</label>
                    <input type="text"
                           className="form-control"
                           id="website"
                           placeholder="Enter Website"
                           value={website}
                           onChange={e => setWebsite(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <select className="form-control"
                            value={gender}
                            onChange={e =>setGender(e.target.value)}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input type="number"
                           className="form-control"
                           id="age"
                           placeholder="Enter Age"
                           value={age}
                           onChange={e => setAge(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="nationality" className="form-label">Nationality</label>
                    <input type="text"
                           className="form-control"
                           id="nationality"
                           placeholder="Enter Nationality"
                           value={nationality}
                           onChange={e => setNationality(e.target.value)}
                    />
                </div>

                <button type="submit" disabled={disabled} className="btn btn-primary w-100">Update</button>
            </form>
        </div>
        </div>
    </>
    );
};

export default Edit;