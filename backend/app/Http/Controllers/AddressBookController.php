<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddressBookRequest;
use App\Models\AddressBook;
use Illuminate\Http\Request;

class AddressBookController extends Controller
{
    public function index()
    {
        try {
            $addressBooks = AddressBook::where('created_by',auth()->id())->latest()->paginate(10);
            return response()->json(['data' => $addressBooks], 200);
        }catch (\Exception $exception){
            return response()->json(['message' => $exception->getMessage()], 500);
        }
    }

     public function store(AddressBookRequest $request)
     {
         try {
             $data = $request->validated();
             $data['created_by'] = auth()->id();
             $addressBook = AddressBook::create($data);
             return response()->json(['message' => 'Address Book created successfully'], 201);
         }catch (\Exception $exception){
             return response()->json(['message' => $exception->getMessage()], 500);
         }
     }

     public function edit($id){
            try {
                $addressBook = AddressBook::findOrFail($id);
                return response()->json(['data' => $addressBook], 200);
            }catch (\Exception $exception){
                return response()->json(['message' => $exception->getMessage()], 500);
            }
     }

     public function update(AddressBookRequest $request, $id)
     {
         try {
             $data = $request->validated();
             $addressBook = AddressBook::findOrFail($id);
             $addressBook->update($data);
             return response()->json(['message' => 'Address Book updated successfully'], 200);
         }catch (\Exception $exception){
             return response()->json(['message' => $exception->getMessage()], 500);
         }
     }

     public function destroy($id)
     {
         try {
             $addressBook = AddressBook::findOrFail($id);
             $addressBook->delete();
             return response()->json(['message' => 'Address Book deleted successfully'], 200);
         }catch (\Exception $exception){
             return response()->json(['message' => $exception->getMessage()], 500);
         }
     }
}
