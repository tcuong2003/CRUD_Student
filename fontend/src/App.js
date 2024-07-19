import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
import '/node_modules/bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import StudentsView from './component/student/StudentsView';
import AddStudent from './component/student/AddStudent';
import NavBar from './component/common/NavBar';
//BrowserRouter đóng gói ứng dụng React cho phép sử dụng các tính năng định tuyến (routing) trong ứng dụng
//Tính năng định tuyến (routing) trong một ứng dụng web là khả năng điều hướng người dùng giữa các trang và các thành phần khác nhau của ứng dụng mà không cần tải lại toàn bộ trang
//Router sử dụng để xác định các định tuyến (routes) trong ứng dụng 
//Route xác định một route cụ thể, xác định đường dẫn URL và thành phần tương ứng muốn hiển thị khi đường dẫn URL đó được kích hoạt
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditStudent from './component/student/EditStudent';
import StudentPofile from './component/student/StudentProfile';


function App() {
  return ( //thuộc tính exact path xác định đường dẫn URL mà route này sẽ khớp
          //Thuộc tính element xác định thành phần React mà bạn muốn render khi route này được kích hoạt
    <main className="container mt-5">
      <Router> 
      <NavBar /> 
        <Routes>
          <Route exact path='/view-students' element={<StudentsView />}></Route> 
          <Route exact path='/add-students/' element={<AddStudent />}></Route> 
          <Route exact path="/edit-student/:id" element={<EditStudent />}></Route>
          <Route exact path="/student-profile/:id" element={<StudentPofile />}></Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;


