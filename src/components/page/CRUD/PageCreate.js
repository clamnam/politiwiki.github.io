import React, { useRef, useState } from 'react';
// import  { PureComponent } from 'react';
import ReactDiffViewer from 'react-diff-viewer-continued';


const oldData = `
const a = 10
const b = 10
const c = () => console.log('foo')

if(a > 10) {
  console.log('bar')
}

console.log('done')
`;


const PageCreate = () => {
  const [diff, setDiff] = useState('');
  const editorRef = useRef(null);

  const onChange = (e) => {
    console.log(e.target.value);
    setDiff(<ReactDiffViewer oldValue={oldData} newValue={e.target.value} splitView={true} />);

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = editorRef.current ? editorRef.current.getContent() : '';

    console.log('Submitting content:', content);
  };

  return (
    <>
    {diff}
    <div className='text-white'>Title</div>
    <form onSubmit={handleSubmit}>
        <textarea onChange={onChange} type="textarea" />
        <div className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">

            <button type="submit">Submit</button>
        </div>      {/* <div className='text-red-500'>{diff}</div> */}

    </form>
</>
  );
};

export default PageCreate;


