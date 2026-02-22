import { useNavigate } from 'react-router-dom'
import { useCreatePatientMutation } from '../../../store/api/patientsApi'
import { useState } from 'react'
import { toast , ToastContainer} from 'react-toastify'

export default function CreatePatient() {
    const navigate = useNavigate()
    const [createPatient, { isLoading, error }] = useCreatePatientMutation()
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        date_of_birth: '',
    })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const res = await createPatient(formData).unwrap()
            toast.success(res.message)
            setFormData({
                full_name: '',
                email: '',
                date_of_birth: '',
            })
            setTimeout(() => {
                navigate("/dashboard/patients")
            }, 2000)
        } catch (err) {
            toast.error(err?.data?.error || "An unknown error occurred")
        }
    }
    return (
        <div className="space-y-4">
            <ToastContainer />
            <h1 className="text-2xl font-bold">Create Patient</h1>
            <form className="space-y-4 border border-slate-300 rounded-md p-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <label htmlFor="full_name" className="text-sm font-medium">Full Name <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        required
                        value={formData.full_name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-md bg-white border border-slate-300" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email <span className="text-red-500">*</span></label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-md bg-white border border-slate-300" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="date_of_birth" className="text-sm font-medium">Date of Birth <span className="text-red-500">*</span></label>
                    <input
                        type="date"
                        id="date_of_birth"
                        name="date_of_birth"
                        required
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-md bg-white border border-slate-300" />
                </div>
                <div className="flex justify-end gap-4">
                    <button type="button" disabled={isLoading} className="bg-gray-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={() => navigate("/dashboard/patients")}>Cancel</button>
                    <button type="submit" disabled={isLoading} className="bg-slate-800 text-white px-4 py-2 rounded-md cursor-pointer">{isLoading ? "Creating..." : "Create"}</button>
                </div>
            </form>
        </div>
    )
}