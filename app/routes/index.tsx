import { Link, useLoaderData } from 'remix'
import type { LoaderFunction } from 'remix'
import { getUser } from '~/utils/session.server'

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request)
  return user
}

export default function Index() {
  const user = useLoaderData()

  return (
    <div className='flex flex-col items-center justify-evenly w-64 h-64 rounded-lg shadow-md bg-slate-50 p-8'>
      {user ? (
        <>
          <p className='text-lg font-bold text-gray-600'>
            <span className='mr-2 text-blue-400'>Hi</span>
            {user.username} 🤓!
          </p>
          <form action='/auth/logout' method='post'>
            <button type='submit' className='bg-blue-500 w-32 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Logout
            </button>
          </form>
        </>
      ) : (
        <>
          <Link to='/auth/login'>
            <button className='bg-blue-500 w-32 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Login</button>
          </Link>
          <Link to='/auth/register'>
            <button className='bg-blue-700 w-32 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded'>
              Register
            </button>
          </Link>
        </>
      )}
    </div>
  )
}
