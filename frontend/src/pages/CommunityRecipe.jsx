import React, { useRef, useState } from 'react'
import Paper from '../components/Paper'
import Button from '../components/Button'
import Input from '../components/Input2'
import store from '../lib/zustand'
import axios from 'axios'

export default function CommunityRecipe() {
    const fileInput = useRef(null)
    const [img, setimg] = useState(null)
    const [imgFile, setImgFile] = useState('')
    const imageUpload = useRef(null)
    const [submit, setSubmit] = useState(false)
    const [submitStatus, setsubmitStatus] = useState({ color: '', text: '' })
    const [title, setTitle] = useState("")
    const [step, setstep] = useState([{equipment:'',ingredients:'',procedure:''}])
    const {backend_url} = store()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setsubmitStatus({ text: 'Image is being uploaded' })
        setSubmit(true)
        //.log(img, desc)
        if(imgFile===''){
            const arr = step.map((s, ind)=>{return {equipment:s.equipment.replace(/, /g,"").split(','),ingredients:s.ingredients.replace(/, /g,"").split(','),step:s.procedure, number:ind+1}})
            console.log(arr)
            const res = await fetch(`${backend_url}/recipe/`, {
                method: "POST",
                body: JSON.stringify({image:"",steps:arr, title:title}),
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token") 
                }
            })
            const data = await res.json()
            console.log(data)
            return
        }
        const formData = new FormData();
        formData.append('file', imgFile);
        formData.append('upload_preset', 'vruksha');
        console.log("uploading")
        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/db670bhmc/image/upload',
                formData
            );

            console.log({ text: 'waiting for response' })
            //.log(response.statusText);
            if (response.statusText === "OK") {
               const arr = step.map((s, ind)=>{return {equipment:s.equipment.replace(/, /g,"").split(','),ingredients:s.ingredients.replace(/, /g,"").split(','),step:s.procedure, number:ind+1}})
                const res = await fetch(`${backend_url}/recipe/`, {
                    method: "POST",
                    body: JSON.stringify({image:response.data.url,steps:arr, title:title}),
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("auth-token") 
                    }
                })
                const data = await res.json()
                console.log(data)
            } else {
                console.log({ text: 'Image could not be uploaded' })
            }
        } catch (error) {
            console.log(error);
        }
    }
    const validateFileType = (e) => {
        var selectedFile = e.target.files[0];
        var allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

        if (!allowedTypes.includes(selectedFile.type)) {
            alert('Invalid file type. Please upload a JPEG, PNG, or PDF file.');
            e.value = '';
        } else {
            setimg((URL.createObjectURL(e.target.files[0])))
            setImgFile(e.target.files[0])
        }
    }
    return (
        <div className=' flex flex-col justify-start gap-5 items-center px-24 py-12 bg-dorange min-h-screen'>
            <Paper>
                <div className={"bg-lavender w-[80vw] relative flex flex-col lg:flex-row justify-between items-center p-8 text-bold"}>
                    <input type='text' placeholder='Title' className={"text-4xl placeholder:text-slate-800 bg-transparent outline-none"} value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>

            </Paper>
            <div className="flex flex-row justify-center items-center gap-8">
            <input type="file" className=' hidden' ref={fileInput} onChange={(e) => { validateFileType(e) }}/>
            {(!img) ? <></> : <img className=' w-[300px] h-[250px] py-10' src={img}></img>}
            <Button onClick={() => {
                fileInput.current.click()
            }}>{!img?"Upload Image":"Change Image"}</Button>
            </div>
            {step.map((s, ind)=>(
            <div className=' flex flex-col justify-start items-center w-full gap-6'>
                <h3 className=' text-xl font-extrabold w-full text-start'>Step {ind+1}</h3>
                <div className=' flex flex-col justify-start gap-3 w-full'>
                    <label>equipment</label>
                    <Input placeholder='oven, whisk, bowl' value={s.equipment} grow setValue={(e)=>{
                        const tempsteps = [...step]
                        tempsteps[ind].equipment = e.target.value
                        setstep(tempsteps)
                    }} />
                </div>
                <div className=' flex flex-col justify-start gap-3 w-full'>
                    <label>Ingredients</label>
                    <Input placeholder='sugar, soda, wheat' value={s.ingredients} grow setValue={(e)=>{
                        const tempsteps = [...step]
                        tempsteps[ind].ingredients = e.target.value
                        setstep(tempsteps)
                    }} />
                </div>
                <div className=' flex flex-col justify-start gap-3 w-full'>
                    <label>Procedure</label>
                    <Input placeholder='Take 200g of sugar and mix it with 500g of wheat in the bowl....' value={s.procedure} grow  setValue={(e)=>{
                        const tempsteps = [...step]
                        tempsteps[ind].procedure = e.target.value
                        setstep(tempsteps)
                    }}/>
                </div>
            </div>))}
            <div className=' flex flex-row w-full justify-between items-center'>
            <Button onClick={()=>{setstep([...step,{equipment:'',ingredients:'',procedure:''}])}}>Add Step</Button>
            <Button color='lavender' onClick={(e)=>{handleSubmit(e)}}>Submit</Button>
            </div>
        </div>
    )
}
