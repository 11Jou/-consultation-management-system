import { useGetConsultationsQuery } from '../../../store/api/consultApi'
import { useState } from 'react'
import Table from '../../../components/Table'
import Pagination from '../../../components/Pagination'
import Error from '../../../components/Error'
import { useNavigate } from 'react-router-dom'

const columns = [
    { id: 'id', label: 'ID' },
    { id: 'patient_name', label: 'Patient Name' },
    { id: 'created_at', label: 'Created At' },
    {id: 'updated_at', label: 'Updated At' },
]
export default function Consultations() {
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const { data, isLoading, error } = useGetConsultationsQuery({ page, page_size: 10 })
    const totalPages = Math.ceil((data?.count ?? 0) / 10) || 1

    if (isLoading) return <div>Loading...</div>
    if (error) return <Error error="Failed to fetch consultations" />

    const handleRowClick = (row) => {
        navigate(`/dashboard/consultations/${row.id}`)
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between">
            <h1 className="text-2xl font-bold">Consultations List</h1>
            <button className="bg-slate-800 text-white px-4 py-2 rounded-md cursor-pointer" 
            onClick={() => navigate("/dashboard/consultations/create")}>New Consultation</button>
            </div>
            <Table columns={columns} data={data?.results ?? []} clickable={true} onRowClick={handleRowClick} />
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    )
}