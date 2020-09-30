import React, {useState} from 'react';
import {
    Button, 
    TextField,
    Dialog, 
    Divider,
    DialogActions,
    DialogContent, 
    DialogContentText,
    DialogTitle,
    Typography,
    CircularProgress,
    InputAdornment,
    Grid} from '@material-ui/core';
import azFunc from '../Apis/api';
import ObjectHash from 'object-hash';
import {Formik, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import '../App.css';

export default ({open, handleClose, redirect}) => {
    const [isWaiting, setIsWaiting] = useState(false);

    const handleClickSubmit = async values => {
      const {id: bizId,password,bizName,email} = values;
      const {biz} = await azFunc.bizDetail.get(bizId);  
      if(biz){
         alert('입력하신 아이디가 이미 사용중 입니다. 다른 아이디를 입력해 주세요');
         return;
      }

      const hashedPassword = ObjectHash(password);
      const signUpData = {
          name: bizName,
          password: hashedPassword,
          email: email,
      };

      setIsWaiting(true);
      azFunc.bizDetail.post(bizId, signUpData)
      .then(isSuccess => {
         setIsWaiting(false);
         if(isSuccess){
            const successMsg = '성공적으로 가입되었습니다. 방금 만들어진 따끈따끈한 홈페이지로 이동합니다!';
            handleClose();
            alert(successMsg);
            redirect(bizId);
         }else{
            const failureMsg = '회원가입에 실패하였습니다. 아이디를 바꾸어서 다시 시도해 보세요'
            alert(failureMsg);
         } 
      });
  };

  const SignupSchema = Yup.object().shape({
    id: Yup.string()
      .min(2, '아이디는 2자 이상이어야 합니다')
      .max(10, '아이디가 너무 길어요')
      .required('아이디를 입력해 주세요'),
    bizName: Yup.string()
      .min(2, '2자 이상입력해 주세요')
      .max(50, '너무 길어요')
      .required('가게명을 입력해 주세요'),
    email: Yup.string()
      .email('유효한 이메일이 아닙니다')
      .required('연락처를 입력해 주세요'),
    password: Yup.string()
      .min(4, '4자 이상입력해 주세요')
      .max(50, '너무 길어요!')
      .required('비밀번호를 입력해 주세요'),
  });

  const ErrMsg = (props)=>{
    return <Typography color='secondary' style={{'font-size':'70%'}}>
        <ErrorMessage {...props} />
      </Typography>
  }

  const SignUpForm = ()=>{
    return <Formik
      initialValues={{
        bizName: '',
        id: '',
        email: '',
        password: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={async values => {
         await handleClickSubmit(values);
      }}>
    {({isSubmitting, handleChange, }) => (
      <Form >
        <DialogContent >
          <TextField
            autoFocus
            name="bizName"
            margin="dense"
            onChange={handleChange}
            label="가게명 (예: 맛있는 김밥 경기점)"
            fullWidth
          />
        <ErrMsg name='bizName'/>
          <TextField
            margin="dense"
            name="email"
            onChange={handleChange}
            label="이메일"
          // type="email"
            fullWidth
          />
        <ErrMsg name='email'/>
          <TextField
            margin="dense"
            name="id"
            onChange={handleChange}
            label="아이디 (아이디인 동시에 새로 만들어질 홈페이지 주소가 됩니다. 알파벳만 가능)"
            fullWidth
            InputProps={{
                startAdornment: <InputAdornment position="start">
                    {window.location.hostname}/
                  </InputAdornment>,
              }}
          />
          <ErrMsg name='id'/>
          <TextField
            margin="dense"
            name="password"
            onChange={handleChange}
            //placeholder="암호화 되어 저장됩니다."
            label="비밀번호"
            type="password"
            fullWidth
          />
          <ErrMsg name='password'/>
        </DialogContent>
        <Divider variant="middle" />
        <DialogActions>
          <Button onClick={handleClose} variant="contained" >
          취소
          </Button>
          <Button type="submit" disabled={isSubmitting} variant="contained" color="primary">
            내 홈페이지로 이동
          </Button>
        </DialogActions>
      </Form>
    )}
    </Formik>
  };
  
  return (
      <Dialog   
        open={open} 
        onClose={handleClose} 
        fullWidth={true} 
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <Typography>아래 정보를 입력하는 즉시 새 홈페이지가 탄생합니다! 간단하죠?</Typography>
        </DialogTitle>
        <Divider variant="middle" />
           {isWaiting ? 
           <Grid container justify="center">
              <CircularProgress color="inherit" />
           </Grid>: <>
          {/*<DialogContentText>
            아래 정보를 입력해 주세요
          </DialogContentText>*/}
           <SignUpForm/>
        </>}
      </Dialog>
  );
}

/*
 {errors.bizName && touched.bizName ? (
                  <ErrMsg>{errors.bizName}</ErrMsg>
                ) : null}
                */