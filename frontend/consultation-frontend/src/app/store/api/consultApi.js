import { api } from '../api'

const consultApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getConsultations: builder.query({
            query: ({ page = 1, page_size = 10, search = '' }) =>
                `/consultations/?page=${page}&page_size=${page_size}&search=${search}`,
            providesTags: ['Consultation'],
            transformResponse: (response) => response.data,
        }),
        getConsultationDetail: builder.query({
            query: (id) => `/consultations/${id}/`,
            providesTags: ['Consultation'],
            transformResponse: (response) => response.data,
        }),
        createConsultation: builder.mutation({
            query: (data) => ({
                url: '/consultations/',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Consultation'],
        }),
        generateAISummary: builder.mutation({
            query: (id) => ({
                url: `/consultations/${id}/generate-summary/`,
                method: 'POST',
            }),
            invalidatesTags: ['Consultation'],
        }),
    }),
})

export const { useGetConsultationsQuery, useCreateConsultationMutation,
    useGetConsultationDetailQuery, useGenerateAISummaryMutation } = consultApi