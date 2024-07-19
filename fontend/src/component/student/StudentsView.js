//useEffect là một hook () trong React được sử dụng để thực hiện các side effects trong các functional components
//useEffect thường được sử dụng để gọi các hàm bất đồng bộ, như gọi API, và thực hiện các thao tác phụ thuộc vào việc render lại (re-render) của component
//hook là một hàm đặc biệt cho phép bạn sử dụng các tính năng của React trong functional components và tái sử dụng logic giữa các components mà không cần sử dụng các lớp (class components).
//Side effects có thể là các hành động như gọi API, thay đổi state, thao tác trên DOM, và nhiều hành động khác.
//useState là một hook trong React được sử dụng để tạo ra một biến state và một hàm setter tương ứng trong một functional component.
//Biến state này có thể thay đổi giá trị và khi giá trị thay đổi, component sẽ được render lại để hiển thị giá trị mới.
//useState thường được sử dụng để lưu trữ và quản lý trạng thái của các thành phần trong ứng dụng React
import React, { useEffect, useState } from 'react';
import axios from 'axios'; //thư viện HTTP client thực hiện CRUD
import {FaEdit, FaEye, FaTrashAlt} from 'react-icons/fa'; //thư viện icons, {FaTrashAlt} biểu tượng rác
//Thay vì sử dụng thẻ <a> thông thường, sử dụng Link component để tạo các liên kết trong ứng dụng React khi sử dụng React Router. Việc này giúp tránh tải lại toàn bộ trang khi chuyển đổi giữa các route
import {Link} from 'react-router-dom'
import Search from '../common/Search';

const StudentsView = () => {
  //Sử dụng Hook useState trong React tạo một state có tên là students dùng lưu trữ danh sách sinh viên và 
  //một hàm setter có tên là setStudents được tạo ra bởi hook useState cập nhật giá trị cho state
  const [students, setStudents] = useState([]); 
  //search là một biến state dùng để lưu trữ giá trị của ô tìm kiếm
  //setSearch là hàm setter được tạo ra bởi hook useState, được sử dụng để cập nhật giá trị của biến state search
  const[search, setSearch] = useState("");

  useEffect(() => { //useEffect trong đoạn mã của bạn được sử dụng để gọi hàm loadStudents mỗi khi component được render, và chỉ gọi một lần duy nhất khi component được render lần đầu tiên.
    loadStudents();
  }, []); //[] nghĩa là bạn muốn hành động được thực hiện chỉ một lần sau khi component được render lần đầu tiên và không có phụ thuộc nào vào các giá trị state hoặc props.


  const loadStudents = async () => { //hàm loadStudents thực hiện các thao tác bất đồng bộ do async và trả về 1 promise
    //promise có thể ở trong một trong ba trạng thái: được giải quyết (resolved) nếu hoàn thành thành công, bị từ chối (rejected) nếu xảy ra lỗi, hoặc đang chờ (pending) nếu chưa hoàn thành.
		const result = await axios.get( //sử dụng axios gửi yêu cầu get đến backend, từ khóa await để đợi cho promise được giải quyết hoặc bị từ chối.
			"http://localhost:9091/students/getall",
			{
				validateStatus: () => { //axios sử dụng phương thức validateStatus để nói các trạng thái đều hợp lệ
					return true; 
				},
			}
		);//302 Mã trạng thái này cung cấp thông tin về liệu yêu cầu đã được xử lý thành công, gặp lỗi, hoặc cần thực hiện thêm hành động nào đó.
		if (result.status === 302) {//sau khi await đợi cho promise này được giải quyết và lấy kết quả trả về, sẽ lấy dữ liệu trả về từ yêu cầu vào state
			setStudents(result.data); // gán dữ liệu vào student bằng cách sử dụng set 
		}
	};

  const handleDelete = async(id) => {
    await axios.delete(`http://localhost:9091/students/delete/${id}`);
    loadStudents();
  }
  

  return (
    <section>
      <Search search={search} setSearch={setSearch}/>
      <table className='table table-bordered table-hover shadow'>
        
        <thead>
          <tr className='text-center'>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Phone Number</th>
            <th>Department</th>
            <th colSpan={3}>Actions</th>
          </tr>
        </thead>

        <tbody className='text-center'>
          {students.filter((st) => 
          st.firstName.toLowerCase().includes(search)
          )
          .map((student, index) => (
            <tr key={student.id}>
              <th scope='row' key={index}>
                {index+1}
              </th>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.email}</td>
              <td>{student.age}</td> 
              <td>{student.phoneNumber}</td>
              <td>{student.department}</td>
              <td className='mx-2'>
                <Link to={`/student-profile/${student.id}`} className='btn btn-info'><FaEye /></Link>
              </td>
              <td className='mx-2'>
                <Link to={`/edit-student/${student.id}`} className='btn btn-warning'><FaEdit/></Link>
              </td>
              <td className='mx-2'>
                <button className='btn btn-danger' onClick={() => handleDelete(student.id)}><FaTrashAlt/></button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </section>
  )
};

export default StudentsView
