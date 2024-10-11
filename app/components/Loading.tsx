import { Spinner } from '@nextui-org/react';

const Loading = () => {
	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 gap-4 text-blue-500 text-xl'>
			Loading 
			<Spinner size='sm' />
		</div>
	)
}

export default Loading;