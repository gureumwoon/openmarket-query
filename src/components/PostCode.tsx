import DaumPostcode, { Address, Search } from 'react-daum-postcode';

interface postCodeModalProps {
    onComplete: (data: Address) => void
}

const PostCodeModal = (props: postCodeModalProps) => {
    const { onComplete } = props;

    const handleSearch = (data: Search) => {
        console.log(data)
    }

    return (
        <>
            <DaumPostcode
                onComplete={onComplete}
                onSearch={handleSearch}
                autoClose
            />
        </>
    )
}

PostCodeModal.defaultProps = {
    style: {
        width: "700px",
        height: "450px",
    },
};

export default PostCodeModal