import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const addmodalstyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 150,
  borderRadius: 2,
  bgcolor: 'slategray',
  opacity: 0.7,
  boxShadow: 24,
  p: 4,
  display:'flex',
  flexDirection:'column',
  alignItems:'center'
};

const Todo = ({ data, setDatas, datas }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editDataValue, setEditDataValue] = useState('');

  const handleEditClose = () => setOpenEditModal(false);

  const deleteTodo = () => {
    for (var i = 0; i <= datas.length; i++) {
      if (datas[i] === data) {
        datas.splice(i, 1);
        setDatas([...datas]);
      }
    }
  }

  const editTodo = () => {
    for (var i = 0; i <= datas.length; i++) {
      if (datas[i] === data) {
        datas[i] = editDataValue;
        setDatas([...datas]);
        setOpenEditModal(false);
      }
    }
  }
  return (
    <li key={data} className="relative text-white hover:bg-teal-600 text-lg border rounded mt-2 shadow-2xl p-2">
      {data}
      <div className="absolute top-2 right-3">
        <DeleteIcon onClick={deleteTodo} className="!text-2xl mx-1 cursor-pointer" />
        <EditIcon onClick={() => setOpenEditModal(true)} className="!text-2xl mx-1 cursor-pointer" />

        <Modal
          open={openEditModal}
          onClose={handleEditClose}
        >
          <Box sx={addmodalstyle}>
            <input type="text" defaultValue={data} onChange={(e) => { setEditDataValue(e.target.value); }} className="text-white bg-transparent border rounded w-50 h-8 block p-2 focus:outline-none" />
            <button onClick={editTodo} className="text-white bg-gradient-to-r from-green-600 to-blue-600 rounded-lg text-xl p-2 mt-4">Edit</button>
          </Box>
        </Modal>
      </div>
    </li>
  )
}

function App() {
  var datalocal;
  if (JSON.parse(localStorage.getItem('datas')) === null) {
    datalocal = [''];
  }
  else {
    datalocal = JSON.parse(localStorage.getItem('datas'));
  }
  const [datas, setDatas] = useState(datalocal);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newData, setNewData] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const [searchDatas, setSearchDatas] = useState([]);
  localStorage.setItem('datas', JSON.stringify(datas));

  const handleAddOpen = () => { setOpenAddModal(true) };
  const handleAddClose = () => { setOpenAddModal(false) };

  const handleSearch = (e) => {
    const searchdatam = datas.filter(data => data.toLowerCase().includes(e.target.value.toLowerCase()))
    setSearchDatas(searchdatam);
    setSearchActive(true);
  }
  const handleAdd = () => {
    if (!datas.includes(newData)) {
      datas.push(newData);
      setDatas(datas);
    }
  }

  return (
    <div className="flex flex-col items-center w-screen h-screen bg-gradient-to-r from-green-600 via-teal-600 to-blue-600">
      <div className="relative w-3/4 lg:w-1/3 mt-8 ">
        <h1 className="text-center text-3xl mb-4 font text-white">Maviden Yeşile Kusursuz Bir Cevap</h1>
        <input type="text" className="text-white w-full h-12 border rounded bg-transparent focus:outline-none p-4 mb-3" onChange={(e) => handleSearch(e)} onBlur={()=>setSearchActive(false)} />
        <SearchIcon onClick={handleSearch} className="absolute cursor-pointer top-16 right-3 !text-3xl text-blue-300" />
        <div className="w-full h-auto" >
          <ul className="mb-4">
            {
              searchActive ? 
              searchDatas.map(data =>
                <Todo data={data} setDatas={setDatas} datas={datas} />
              )
              :
              datas.map(data =>
                <Todo data={data} setDatas={setDatas} datas={datas} />
              )
            }
          </ul>
        </div>
      </div>
      <button onClick={handleAddOpen} className="text-white text-lg px-4 border rounded">Ekle</button>
      <Modal
        open={openAddModal}
        onClose={handleAddClose}
      >
        <Box sx={addmodalstyle}>
          <input type="text" onChange={(e) => { setNewData(e.target.value); }} className="text-white bg-transparent border rounded w-50 h-8 p-4 focus:outline-none" />
          <button onClick={handleAdd} className="text-white bg-gradient-to-r from-green-600 to-blue-600 rounded-lg text-xl p-2 mt-4">Ekle</button>
        </Box>
      </Modal>
    </div>
  );
}

export default App;