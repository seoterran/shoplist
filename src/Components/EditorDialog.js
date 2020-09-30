import React from 'react';
import {Editor, EditorState, ContentState} from 'draft-js';
import { Dialog,DialogContent,DialogActions,Button,DialogTitle, Divider} from '@material-ui/core';
import azFunc from '../Apis/api';

export default ({bizId, contentState, open, setOpen}) => {
  const [editorState, setEditorState] = React.useState(
      EditorState.createWithContent(ContentState.createFromText(contentState)) //editorState.createEmpty()
  );

  const editorRef = React.useRef(null);

  function focusEditor() {
     editorRef.current.focus();
  }

  React.useEffect(() => {
    editorRef.current && focusEditor()
  }, [editorRef.current]);

  const handleClose =()=> {
     setOpen(false);
  };

  const handleClickSubmit = async () => {  
     const currentText = editorState.getCurrentContent().getPlainText();
     const isSuccess = await azFunc.bizDetail.put(bizId, currentText);
     //console.log(currentText,contentState,res);
     if(isSuccess){
        setOpen(false);
        alert('변경되었습니다');
     }
  };

  return (
    <Dialog open={open}
            fullWidth = {true}
            maxWidth='sm'
            aria-labelledby="form-dialog-title">
       <DialogTitle id="form-dialog-title">고객들에게 보여질 내용을 아래에서 편집해 주세요</DialogTitle>
       <Divider variant="middle" />
       <DialogContent>
         <div onClick={focusEditor}>
            <Editor ref={editorRef}
                  placeholder='내용이 현재 비어있습니다.'
                  editorState={editorState}
                  onChange={editorState => setEditorState(editorState)}
            />    
         </div>
      </DialogContent>
      <Divider variant="middle" />
      <DialogActions>
          <Button onClick={handleClose} variant="contained" >
            취소
          </Button>
          <Button color="primary" variant="contained" onClick={handleClickSubmit}>
            저장
          </Button>  
      </DialogActions>
    </Dialog>
  );
}
