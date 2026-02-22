import { useNavigate } from 'react-router-dom'
import { useCreateConsultationMutation } from '../../../store/api/consultApi'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useGetAllPatientsQuery } from '../../../store/api/patientsApi'
import Error from '../../../components/Error'

export default function CreateConsultation() {
    const navigate = useNavigate()
    const [createConsultation, { isLoading, error }] = useCreateConsultationMutation()
    const [formData, setFormData] = useState({
        patient: '',
        symptoms: '',
        diagnosis: '',
    })
    const { data: patients, isLoading: isLoadingPatients, error: errorPatients } = useGetAllPatientsQuery()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await createConsultation(formData).unwrap()
            toast.success(res.message)
            setFormData({
                patient: '',
                symptoms: '',
                diagnosis: '',
            })
            setTimeout(() => {
                navigate("/dashboard/consultations")
            }, 2000)
        } catch (err) {
            toast.error(err.data.error)
        }
    }
    if (isLoadingPatients) return <div>Loading...</div>
    if (errorPatients) return <Error error="Failed to fetch patients" />
    return (
        <div className="space-y-4">
            <ToastContainer />
            <h1 className="text-2xl font-bold">Create Consultation</h1>
            <form className="space-y-4 border border-slate-300 rounded-md p-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <label htmlFor="patient" className="text-sm font-medium">Patient <span className="text-red-500">*</span></label>
                    <select
                        id="patient"
                        name="patient"
                        required
                        value={formData.patient}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-md bg-white border border-slate-300">
                        <option value="">Select Patient</option>
                        {patients?.map((patient) => (
                            <option key={patient.id} value={patient.id}>{patient.full_name} ({patient.email})</option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <label htmlFor="symptoms" className="text-sm font-medium">Symptoms <span className="text-red-500">*</span></label>
                    <textarea
                        id="symptoms"
                        name="symptoms"
                        required
                        value={formData.symptoms}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-md bg-white border border-slate-300"></textarea>
                </div>
                <div className="space-y-2">
                    <label htmlFor="diagnosis" className="text-sm font-medium">Diagnosis</label>
                    <textarea
                        id="diagnosis"
                        name="diagnosis"
                        rows={4}
                        value={formData.diagnosis}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-md bg-white border border-slate-300"></textarea>
                </div>
                <div className="flex justify-end gap-4">
                    <button type="button" disabled={isLoading} className="bg-gray-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={() => navigate("/dashboard/consultations")}>Cancel</button>
                    <button type="submit" disabled={isLoading} className="bg-slate-800 text-white px-4 py-2 rounded-md cursor-pointer">{isLoading ? "Creating..." : "Create"}</button>
                </div>
            </form>
        </div>
    )
}