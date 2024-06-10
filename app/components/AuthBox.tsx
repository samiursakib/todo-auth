const Authbox = ({ title, children }: { title: string, children: React.ReactNode }) => {
    return (
      <div className='flex w-full h-screen justify-center items-center'>
        <div
          className='border border-gray-200 p-4 w-96 rounded-md'
          >
          <div className='border-b-[1px] text-center pb-4 uppercase'>{title}</div>
          { children }
        </div>
      </div>
    );
  }
  
  export default Authbox;