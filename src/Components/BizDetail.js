import React, 
    {useEffect,
    useReducer} from 'react';
import EditorDialog from './EditorDialog';
import azFunc from '../Apis/api';
import {CircularProgress, Button, TextField, Chip,
    AppBar,
    Toolbar,
Typography} from '@material-ui/core';
import 'material-design-icons/iconfont/material-icons.css';
import ObjectHash from 'object-hash';
import {Editor, EditorState, ContentState} from 'draft-js';
import EditIcon from '@material-ui/icons/Edit';


export default ({ match } ) => {
  const [dialogOpenState, setDialogOpenState] = React.useState(false);
  const {id: bizId} = match.params;

  const dataFetchReducer = (state={}, action) => {
    switch (action.type) {
      case 'FETCH_INIT':
        return { 
            loadingState: true,
         };
      case 'FETCH_SUCCESS':
          const {payload} = action;
          const content = payload.description ? payload.description : '';
          
          return { 
                loadingState: false,
                bizState: action.payload,
                editorState: EditorState.createWithContent(ContentState.createFromText(content))
            };
      case 'FETCH_FAILURE':
        return { 
            loadingState: false ,
            bizState: null
        };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(dataFetchReducer, {
      loadingState: false,
      bizState: null,
      editorState: EditorState.createEmpty()
   });

  const {bizState, editorState,loadingState} = state;
  
  const loadBizData = async ()=>{   
      try{
          dispatch({ type: 'FETCH_INIT'});
          const {biz} = await azFunc.bizDetail.get(bizId);  
          if(!biz){
            throw new Error();
          }
          dispatch({ type: 'FETCH_SUCCESS', payload: biz });
        }catch(error){
            debugger
          dispatch({ type: 'FETCH_FAILURE'});
        }
  };
  
  const validatePassword = async ()=> {
     var pwInput = prompt("비밀번호를 입력해 주세요:");
     if(pwInput === ''){
        alert('패스워드를 입력해 주세요.');
     }else if(pwInput) {
        const {password} = await azFunc.bizDetail.get(bizId); 
        const hashedPassword = ObjectHash(pwInput);
        const valid = hashedPassword === password;
        if(!valid){
           alert('정확한 패스워드를 입력해 주세요.');
        }
        return valid;
     }
     return false;
  };

  const handleClickSettings = async ()=>{
     const validPassword = await validatePassword();
     if(!validPassword){    
        return;
     }
     setDialogOpenState(true);
  };
  
  const EditBtn = ()=>{
      return <>
        <EditIcon/>편집
      </>

      /*<Button onClick={handleClickSettings} 
                    size="small"  
                    variant="outlined"
                    color="primary"
                    startIcon={<EditIcon />} > 편집
                    
        </Button> */
  };
  
  const Main = ()=>{
      return <> 
        {bizState ? 
        <>
             <AppBar >
                <Toolbar>
                  <Typography variant="h6">{bizState.name}</Typography>
                  <Chip label={<EditBtn/>} variant='outlined' onClick={handleClickSettings} color='info' />  
                </Toolbar>
              </AppBar>
              <Toolbar id="back-to-top-anchor" />
            <nobr>
                {/*<Chip label={bizState.name} color='primary' />*/}
                           
            </nobr>
            <div class="godo">
                <br/><br/><br/> 
                <Editor 
                    placeholder='고객들에게 보여질 내용이 비어있습니다. 편집 버튼을 눌러 내용을 입력해 주세요'
                    editorState={editorState}
                    readOnly={true}
                />   
            </div>
        </>
        : <>입력하신 sholplist.kr/{bizId}는 존재하지 않는 주소입니다. 정확한 주소를 입력하셨는지 확인해 주세요.</>}
    </>
  };

  React.useEffect(() => {
      loadBizData();
  },[dialogOpenState]);

  return (
      <>     
        {bizState && <EditorDialog 
            open={dialogOpenState}
            setOpen = {setDialogOpenState}
            bizId = {bizId}
            contentState={bizState.description? bizState.description: ''}/>}                 
        <div className="App">  
            <header className="App-header">
                {loadingState ?
                  <CircularProgress color="inherit" />
                  : <Main/>
                }
            </header>
        </div>   
      </>
  );
}
