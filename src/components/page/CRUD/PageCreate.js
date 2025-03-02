import React, { useRef, useState } from 'react';
// import  { PureComponent } from 'react';
import ReactDiffViewer from 'react-diff-viewer';
import 'tinymce/tinymce';
import 'tinymce/themes/silver';
import 'tinymce/icons/default';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = editorRef.current ? editorRef.current.getContent() : '';
    setDiff(<ReactDiffViewer oldValue={oldData} newValue={content} splitView={true} />);

    console.log('Submitting content:', content);
  };

  return (
    <>
    {diff}
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <div className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">

        <button type="submit">Submit</button>
        </div>      {/* <div className='text-red-500'>{diff}</div> */}

      </form>
    </>
  );
};

export default PageCreate;


