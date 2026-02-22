import { useState } from 'react'
import { useGetPatientsQuery } from '../../../store/api/patientsApi'
import Table from '../../../components/Table'
import Pagination from '../../../components/Pagination'
import { useNavigate } from 'react-router-dom'
import Error from '../../../components/Error'


const columns = [
  { id: 'full_name', label: 'Full Name' },
  { id: 'email', label: 'Email' },
  { id: 'age', label: 'Age' },
  { id: 'date_of_birth', label: 'Date of Birth' },
]

export default function Patients() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const { data, isLoading, error } = useGetPatientsQuery({ page, page_size: 10 })
  const totalPages = Math.ceil((data?.count ?? 0) / 10) || 1

  if (isLoading) return <div>Loading...</div>
  if (error) return <Error error="Failed to fetch patients" />

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Patients List</h1>
        <button className="bg-slate-800 text-white px-4 py-2 rounded-md cursor-pointer" onClick={() => navigate("/dashboard/patients/create")}>
          Add Patient
        </button>
      </div>
      <Table columns={columns} data={data?.results ?? []} />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  )
}