import { baseAPI } from "../../api/baseAPI";

const academicSemesterAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemester: builder.query({
      query: () => ({
        url: "/academic-semesters",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllSemesterQuery } = academicSemesterAPI;
