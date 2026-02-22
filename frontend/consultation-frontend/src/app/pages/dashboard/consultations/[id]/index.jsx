import { useParams } from 'react-router-dom'
import { useGetConsultationDetailQuery, useGenerateAISummaryMutation } from '../../../../store/api/consultApi'
import Error from '../../../../components/Error'
import DetailRow from '../../../../components/DetailRow'
import { toast, ToastContainer } from 'react-toastify'

export default function ConsultationDetail() {
  const { id } = useParams()
  const { data, isLoading, error } = useGetConsultationDetailQuery(id)
  const [generateSummary, { isLoading: isGenerating }] = useGenerateAISummaryMutation()

  const handleGenerateSummary = async () => {
    try {
      await generateSummary(id).unwrap()
      toast.success("AI summary generated successfully")
    } catch (err) {
      toast.error("Failed to generate AI summary")
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <Error error="Failed to fetch consultation" />

  return (
    <div className="w-full flex justify-center">
      <ToastContainer />
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6">
        <div className="border-b pb-4 mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Consultation Details
          </h1>
          <button
            type="button"
            onClick={handleGenerateSummary}
            disabled={isGenerating}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isGenerating ? 'Generating...' : 'Generate Summary'}
          </button>
        </div>

        <div className="space-y-4">
          <DetailRow label="Patient" value={data.patient_name} />
          <DetailRow label="Symptoms" value={data.symptoms} />
          <DetailRow label="Diagnosis" value={data.diagnosis} />
          <DetailRow label="AI Summary" value={data.ai_summary} />
          <DetailRow label="Created At" value={data.created_at} />
          <DetailRow label="Updated At" value={data.updated_at} />
        </div>
      </div>
    </div>
  )
}