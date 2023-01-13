import {
    PagingState,
    IntegratedPaging, SortingState, IntegratedSorting, SearchState, IntegratedFiltering, DataTypeProvider,
} from '@devexpress/dx-react-grid';
import './VideoTable.css'
import {
    Grid, Toolbar,
    Table, SearchPanel,
    TableHeaderRow,
    PagingPanel,
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

import {useEffect, useState} from "react";
import {ArrowUp, ArrowDown, Trash, Pencil, BoxArrowRight, BoxArrowUpRight, Eye, Star} from 'react-bootstrap-icons';

import mockData from '../MOCK_DATA.json'
import {Button, Form, Modal} from "react-bootstrap";
import {toast} from "react-toastify";
import axios from "axios";

const SortingIcon = ({direction}) =>
    direction === 'asc' ? <ArrowUp/> : <ArrowDown/>


const SortLabel = ({onSort, children, direction}) => (
    <button
        type="button"
        className="btn btn-light btn-sm"
        onClick={onSort}
    >
        {children}
        {(direction && <SortingIcon direction={direction}/>)}
    </button>
);
const ActionButtonsFormatter = (props) => {


    function deleteVideo() {
        axios.delete(`/api/videos`, {
            data: {
                id: props.value.id
            }
        })
            .then(res => {
                toast.success(res.data.message)
                props.refreshData()
            })
            .catch(e => e.response.data.errors.forEach((error) => toast.error(error))
            )

    }

    function handleEditModal() {
        props.handleShowVideo(props.value)
    }

    return (
        <div>
            <a target="_blank" href={props.value.url} className='m-2'><Button variant={"primary"}><Eye/></Button></a>
            <Button onClick={() => handleEditModal()} className='m-2' variant={"secondary"}><Pencil/></Button>

            <Button onClick={() => deleteVideo()} className='m-2' variant={"danger"}><Trash/></Button>
        </div>
    );
};

const ActionsButtonsTypeProvider = (props) => {
    return (
        <DataTypeProvider
            formatterComponent={({row}) => (
                <ActionButtonsFormatter value={row} handleCloseVideo={props.handleCloseVideo}
                                        handleShowVideo={props.handleShowVideo} refreshData={props.refreshData}/>
            )}
            {...props}
        />
    );
};


function VideoTable({videoAdded}) {
    const [columns] = useState([
        {name: 'title', title: 'Title'},

        {name: 'author', title: 'Author'},
        {name: 'rating', title: 'Rating', getCellValue: (row) => (`${row.rating} ${[...Array(row.rating).keys()].map((item) => '✰')}`.replaceAll(',',''))},
        {name: 'action', title: 'Action'},
    ]);


    const [rows, setRows] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);

    const [pageSizes] = useState([5, 10, 15, 0]);
    const [sorting, setSorting] = useState([{columnName: 'title', direction: 'asc'}]);
    const [searchValue, setSearchState] = useState('');
    const [showVideo, setShowVideo] = useState(false);

    const handleCloseVideo = () => setShowVideo(false);
    const handleShowVideo = (video) => {
        setShowVideo(true)
        setRating(video.rating)
        setAuthor(video.author)
        setTitle(video.title)
        setUrl(video.url)
        setId(video.id)
    };


    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [rating, setRating] = useState(1)
    const [url, setUrl] = useState('')
    const [id, setId] = useState(0)


    const refreshData = () => {
        axios.get(`/api/videos`)
            .then(res => {
                toast.success(res.data.message)
                setRows(res.data)

            })
            .catch(e => e.response.data.errors.forEach((error) => toast.error(error))
            )
    }

    useEffect(() => {
        refreshData()

    }, [])

    useEffect(() => {
        videoAdded && refreshData()

    }, [videoAdded])

    function executeEditVideo() {
        axios.put(`/api/videos`, {
            id,
            title,
            author,
            url, rating
        })
            .then(res => {
                toast.success(res.data.message)
                handleCloseVideo()
                setRating(1)
                setTitle('')
                setAuthor('')
                setUrl('')
                refreshData()
            })
            .catch(e => e.response.data.errors.forEach((error) => toast.error(error))
            )
    }

    return (
        <div className="card">
            <Grid
                rows={rows}
                columns={columns}
            > <SortingState
                sorting={sorting}
                onSortingChange={setSorting}

            />
                <IntegratedSorting/>
                <PagingState
                    defaultPageSize={5}

                    currentPage={currentPage}
                    onCurrentPageChange={setCurrentPage}
                    pageSize={pageSize}
                    onPageSizeChange={setPageSize}
                />
                <ActionsButtonsTypeProvider for={["action"]} handleCloseVideo={handleCloseVideo}
                                            handleShowVideo={handleShowVideo}
                                            refreshData={refreshData}/>

                <IntegratedPaging/>
                <SearchState
                    value={searchValue}
                    onValueChange={setSearchState}
                />
                <IntegratedFiltering/>
                <Table/>
                <TableHeaderRow showSortingControls sortLabelComponent={SortLabel}
                /> <Toolbar/>
                <SearchPanel/>
                <PagingPanel pageSizes={pageSizes}
                />
            </Grid>
            <Modal show={showVideo} onHide={handleCloseVideo}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit video</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter Title" value={title}
                                          onChange={(e) => setTitle(e.target.value)}/>

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="author">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" placeholder="Enter Author" value={author}
                                          onChange={(e) => setAuthor(e.target.value)}/>

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="url">
                            <Form.Label>URL</Form.Label>
                            <Form.Control type="url" placeholder="Enter URL"
                                          onChange={(e) => setUrl(e.target.value)} value={url}
                            />

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="rating">
                            <Form.Label>Rating ({rating}) {[...Array(rating).keys()].map((item) => <Star
                                key={item}/>)}</Form.Label>
                            <Form.Range min={1} max={10} placeholder="Enter Rating" value={rating}
                                        onChange={(e) => setRating(Number(e.target.value))}/>


                        </Form.Group>


                    </Form>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="button" onClick={() => executeEditVideo()}>
                        Edit video
                    </Button>

                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default VideoTable;