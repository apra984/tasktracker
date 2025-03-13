import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Task} from './../types/Task'

export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7002/api/' }),
    endpoints: (builder) => ({
      getTasks: builder.query<Task[], string>({
        query: () => `tasks`,
      }),

      getTask: builder.query<Task, number>({
        query: (id) => `task/${id}`,
      }),

      createTask: builder.mutation<Task, Task>({
        query: (newTask) => ({
          url: 'createTask', 
          method: 'POST',
          body: newTask, 
        }),
      }),

      updateTask: builder.mutation<Task, Task>({
        query: (updatedTask) => ({
          url: `updateTask`, 
          method: 'PUT',
          body: updatedTask, 
        }),
      }),
      
      deleteTask: builder.mutation<void, number>({
        query: (id) => ({
          url: `deleteTask/${id}`,
          method: 'DELETE',
        }),
      }),
    }),
  })

  export const {useGetTasksQuery, useGetTaskQuery,  useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = taskApi;