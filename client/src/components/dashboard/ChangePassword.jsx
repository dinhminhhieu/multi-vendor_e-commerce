import React from 'react'

const ChangePassword = () => {
  return (
     <div className='p-4 bg-white'>
        <h2 className='text-xl text-slate-600 pb-5'>Thay đổi mật khẩu</h2>
        <form>
            <div className='flex flex-col gap-1 mb-2'>
                <label htmlFor="old_password">Mật khẩu cũ</label>
                <input type="password" id='old_password' name='old_password' placeholder='Nhập mật khẩu cũ' className='outline-none px-3 py-1 border rounded-md text-slate-600' />
            </div>
            <div className='flex flex-col gap-1 mb-2'>
                <label htmlFor="new_password">Mật khẩu mới</label>
                <input type="password" id='new_password' name='new_password' placeholder='Nhập mật khẩu mới' className='outline-none px-3 py-1 border rounded-md text-slate-600' />
            </div>
            <div>
                <button className='px-8 py-2 bg-red-500 shadow-lg hover:shadow-purple-500/30 text-white rounded-md'>Cập nhật</button>
            </div>
        </form>
    </div>
  )
}

export default ChangePassword