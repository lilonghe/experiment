import { NextPage } from "next"

interface IProps {
    pageCount: number
    page: number
    onChange: (page: number) => void
    className?: string
}

const Pagination: NextPage<IProps> = ({ page, pageCount, onChange, className = '' }) => {

    const handleChangePage = (offset: number) => {
        onChange(page + offset)
    }

    return (
        <div className={"pagination text-right " + className}>
            <button 
                className="btn"
                disabled={page === 1}
                onClick={() => handleChangePage(-1)}>
                    Previous
            </button>
            <button 
                className="btn ml-2"
                disabled={page >= pageCount}
                onClick={() => handleChangePage(1)}>
                    Next
            </button>
        </div>
    )
}

export default Pagination