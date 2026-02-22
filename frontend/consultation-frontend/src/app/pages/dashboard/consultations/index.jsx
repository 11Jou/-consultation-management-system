import { useGetConsultationsQuery } from '../../../store/api/consultApi'
import { useState, useEffect } from 'react'
import Table from '../../../components/Table'
import Pagination from '../../../components/Pagination'
import Error from '../../../components/Error'
import SearchBar from '../../../components/SearchBar'
import { useNavigate } from 'react-router-dom'

const DEBOUNCE_MS = 500

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'patient_name', label: 'Patient Name' },
  { id: 'created_at', label: 'Created At' },
  { id: 'updated_at', label: 'Updated At' },
]

export default function Consultations() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [search])

  const { data, isLoading, error } = useGetConsultationsQuery({
    page,
    page_size: 10,
    search: debouncedSearch,
  })
  const totalPages = Math.ceil((data?.count ?? 0) / 10) || 1

  const handleSearchChange = (value) => {
    setSearch(value)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <Error error="Failed to fetch consultations" />

  const handleRowClick = (row) => {
    navigate(`/dashboard/consultations/${row.id}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Consultations List</h1>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <SearchBar
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by patient"
            className="w-full sm:w-72"
          />
          <button
            className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors shrink-0"
            onClick={() => navigate('/dashboard/consultations/create')}
          >
            New Consultation
          </button>
        </div>
      </div>
      <Table
        columns={columns}
        data={data?.results ?? []}
        clickable={true}
        onRowClick={handleRowClick}
      />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  )
}
