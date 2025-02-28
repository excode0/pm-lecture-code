'use client';

import { useState, useEffect } from 'react';
import { FaUserEdit, FaTrash, FaPlus } from 'react-icons/fa';
import SideBar from '../component/sidebar';
import { useRouter } from 'next/navigation';

interface ILecturer {
  id: number;
  fullName: string;
  email: string;
  nidn: string;
  faculty: string;
  position: string;
  visaStatus: string;
  coursesTaught: { courseName: string }[];
}

export default function LecturerPage() {
  const [lecturers, setLecturers] = useState<ILecturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLecturerId, setDeleteLecturerId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetch('/api/lecturers')
      .then((res) => res.json())
      .then((data) => {
        setLecturers(data);
        setLoading(false);
      })
      .catch((error) => console.error('Failed to fetch data:', error));
  }, []);

  const handleDelete = async () => {
    if (!deleteLecturerId) return;
    setIsDeleting(true);

    try {
      await fetch(`/api/lecturers/${deleteLecturerId}`, { method: 'DELETE' });
      setLecturers(
        lecturers.filter((lecturer) => lecturer.id !== deleteLecturerId),
      );
    } catch (error) {
      console.error('Failed to delete lecturer:', error);
    } finally {
      setIsDeleting(false);
      setDeleteLecturerId(null);
    }
  };

  return (
    <div className='flex min-h-screen bg-gray-100'>
      {/* Sidebar */}
      <SideBar />
      {/* Content */}
      <main className='flex-1 p-6'>
        <h1 className='text-2xl font-bold mb-4'>International Lecturers</h1>
        <button
          onClick={() => router.push('/dashboard/lecturers/add')}
          className='mb-4 bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2'
        >
          <FaPlus /> Add Lecturer
        </button>
        <div className='bg-white p-4 rounded shadow-md'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className='w-full border-collapse border border-gray-200'>
              <thead>
                <tr className='bg-gray-200'>
                  <th className='border p-2'>Full Name</th>
                  <th className='border p-2'>Email</th>
                  <th className='border p-2'>NIDN</th>
                  <th className='border p-2'>Faculty</th>
                  <th className='border p-2'>Position</th>
                  <th className='border p-2'>Visa Status</th>
                  <th className='border p-2'>Courses Taught</th>
                  <th className='border p-2'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {lecturers.map((lecturer) => (
                  <tr key={lecturer.id} className='text-center'>
                    <td className='border p-2'>{lecturer.fullName}</td>
                    <td className='border p-2'>{lecturer.email}</td>
                    <td className='border p-2'>{lecturer.nidn}</td>
                    <td className='border p-2'>{lecturer.faculty}</td>
                    <td className='border p-2'>{lecturer.position}</td>
                    <td className='border p-2'>{lecturer.visaStatus}</td>
                    <td className='border p-2'>
                      {lecturer.coursesTaught
                        .map((course) => course.courseName)
                        .join(', ')}
                    </td>
                    <td className='border p-2 flex gap-2 justify-center'>
                      <button
                        onClick={() =>
                          router.push('/dashboard/lecturers/' + lecturer.id)
                        }
                        className='bg-yellow-500 text-white p-2 rounded'
                      >
                        <FaUserEdit />
                      </button>
                      <button
                        className='bg-red-600 text-white p-2 rounded'
                        onClick={() => {
                          setDeleteLecturerId(lecturer.id);
                          handleDelete();
                        }}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteLecturerId !== null && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
            <h2 className='text-xl font-semibold'>Delete Confirmation</h2>
            <p className='mt-2 text-gray-600'>
              Are you sure you want to delete this lecturer?
            </p>
            <div className='mt-4 flex justify-end gap-3'>
              <button
                className='bg-gray-300 px-4 py-2 rounded'
                onClick={() => setDeleteLecturerId(null)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                className='bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2'
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
