import '../../pages/Detail/Detail.css';
import { BsTrash, BsPencil } from 'react-icons/bs';

function CommentCard({ comment, handleClickEdit, handleClickDelete }) {
	return (
		<div className='kumparan__flex kumparan__width100Percent kumparan__mb20'>
			<div className='kumparan__flex kumparan__flexColumn kumparan__mb20 kumparan__width80Percent kumparan__commentContainer'>
				<span className='kumparan__commentEmail kumparan__font16'>{comment.email}</span>
				<span className='kumparan__font16'>{comment.body}</span>
			</div>
			<div className='kumparan__icon kumparan__flex kumparan__flexColumn kumparan__pointer'>
				<div className='kumparan__pencilIcon' onClick={() => handleClickEdit(comment)}>
					<BsPencil />
				</div>
				<div className='kumparan__trashIcon kumparan__mt30' onClick={() => handleClickDelete(comment)}>
					<BsTrash />
				</div>
			</div>
		</div>
	);
}

export default CommentCard;
