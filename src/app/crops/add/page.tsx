"use client"
import { postCrops } from '@/app/services/apiMethod';
import { tree } from 'next/dist/build/templates/app-page';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const AddCrop = () => {
  const router = useRouter();
  const [formData,setFormData]=useState({
    name:"",
    acres:"",
    date:""
  })
  const [loading,setLoading]=useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData((prev)=>({
        ...prev,
        [name]:value
    }))
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    setMessage({type:'',text:''});
    if(!formData.name){
        setMessage({type:'error',text:'Crop name can not be empty'});
        return;
    }
    if(!formData.acres || Number(formData.acres)<=0){
        setMessage({type:'error',text:'Please enter a valid acreage'});
        return;
    }
    setLoading(true);
    postCrops(formData)
    .then((response)=>{
        setMessage({type:'success',text:response.message});
        setTimeout(() => {
            router.push('/crops')
          }, 1500)
          setLoading(false);
    })
    .catch((error:any)=>{
        setMessage({
          type:'error',
          text:error.response.data.message
        })
        setLoading(false);
      })
  }
  return (
    <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
            <h1 className='mb-6'>Add New Crop</h1>
            <div className='card'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label htmlFor='name' className='form-label'>Crop Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-input"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='name' className='form-label'>Acres</label>
                        <input
                            type="number"
                            id="acres"
                            name="acres"
                            className="form-input"
                            value={formData.acres}
                            onChange={handleChange}
                            required
                            />
                    </div>
                    <label htmlFor="date" className='form-label'>Date</label>
                <div className='relative'>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        className='form-input'
                        value={formData.date}
                        onChange={handleChange}
                     />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                <button type="button" className="btn btn-secondary" onClick={() => router.push("/crops")}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                      Saving...
                    </span>
                  ) : (
                    "Add Crop"
                  )}
                </button>
              </div>
                </form>
            </div>
        </div>
      
    </div>
  )
}

export default AddCrop;
