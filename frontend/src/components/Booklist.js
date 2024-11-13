import { useEffect, useState } from "react"; 
import '../styles/userlist.css';
import { useNavigate, useLocation } from "react-router-dom";

const Booklist = () => {
    let location = useLocation();
    let navigate = useNavigate();
    let [books, setBooks] = useState([]);

    useEffect(() => {
        let fetchData = async () => {
            let response = await fetch('http://localhost:8094/libro/disponibles'); // Updated endpoint
            let data = await response.json();
            setBooks(data);
        }
        fetchData();
    }, []); // Updated dependency array

    let readmore = (id) => {
        if (location.pathname === '/admin/book-list') {
            navigate(`/admin/book-list/${id}`);
        } else {
            navigate(`/user/book-list/${id}`);
        }
    }

    return (
        <div className="booklist">
            <div className="main addmain">
                <h1>Available Books ({books.length})</h1>
                <div className="section">
                    {
                        books.map(data =>
                            <div className="bookcard" key={data.id}>
                                <div className="bookimage">
                                    <img src={data.thumbnailUrl} title={data.title} alt={data.title} />
                                </div>
                                <div className="bookcardinfo">
                                    <div className="bookscardinfo-no-btns">
                                        <div>
                                            <h2 title={data.title}><strong>{data.title}</strong></h2>
                                        </div>
                                        <div>
                                            <p><span>Authors : </span> {data.authors}</p>
                                        </div>
                                        <div>
                                            <p className="categories"><span>Categories :</span> {data.categories}</p>
                                        </div>
                                        <div>
                                            <p><span>Page Count : </span>{data.pageCount}</p>
                                        </div>
                                    </div>
                                    <div className="booklistbtns">
                                        <div>
                                            <button title="Read more >>" onClick={() => readmore(data.id)} className="booklistbtn">Read More &gt;&gt;</button>
                                        </div>
                                        {location.pathname === '/admin/book-list' && (
                                            <div>
                                                <button title="Delete" className="booklistremove" onClick={() => handleclick(data.id, data.title)}>
                                                    <img src="../images/remove32.png" alt="" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>)
                    }
                </div>
            </div>
        </div>
    );
}

export default Booklist;
