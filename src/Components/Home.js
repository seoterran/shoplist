import React from 'react';
import {Button,Paper,
    Step,
    Stepper,
    StepContent,
    StepLabel,
    Typography,
    Grid,
    withStyles
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SignUpDialog from './SignUpDialog';
import {
    BrowserRouter as Router,
    Redirect
  } from 'react-router-dom'
import '../App.css';

function getStepContent(step) {
    switch (step) {
      case 0:
          return <>'만들어 볼래요' 버튼을 클릭하여 정보 입력<br/> (가게명, 아이디, 이메일, 비밀번호)</>;
      case 1:
          return <> shoplist.kr/'아이디' 로 새 홈페이지가 만들어집니다.<br/>
          (본인의 아이디가 abc 라면 홈페이지 주소는 &nbsp;
          <a style={{'text-decoration': 'none'}} href='http://shoplist.kr/abc' target='_blank'>shoplist.kr/abc</a> 가 됩니다.
          클릭해서 샘플 홈페이지를 방문해 보세요) </>;
      case 2:
          return <>처음 만들어진 홈페이지는 내용이 비어있으니 '편집' 버튼을 눌러 고객들에게 보여질 내용 입력해 주세요 <br/>
          (추후 필요할 때마다 홈페이지 내용을 간편히 업데이트 가능)<br/>
          </>
      case 3:
          return <>홈페이지 주소를 고객들에게 홍보해 주세요.</>  
      default:
        return 'Unknown step';
    }
};

export default () => {
  const [open, setOpen] = React.useState(false);
  const [bizId, setBizId] = React.useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ['정보 입력', '홈페이지 생성','내용 작성','주소 홍보'];

  const handleClickOpen = () => {
    handleReset();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const redirect = (bizId)=>{
     setBizId(bizId);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const MyButton = ()=> {
    return <Button 
              variant="contained"
              color='primary' 
              onClick={handleClickOpen}
         //     className={classes.button}
            >
              만들어 볼래요
          </Button>
  };
  
  const ActionButton = withStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
      textTransform: 'capitalize',
    },
  })(MyButton);

  const MyStepper = ()=>{
    const useStyles = makeStyles((theme) => ({
        root: {
          width: '95%',
        },
        button: {
          marginTop: theme.spacing(1),
          marginRight: theme.spacing(1),
        },
        actionsContainer: {
          marginBottom: theme.spacing(2),
        },
        resetContainer: {
          padding: theme.spacing(3),
        },
      }));

    const classes = useStyles();
      
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
    return <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent >
              <Typography class="godo">{getStepContent(index)}</Typography>
              <div >
                  <Button
                     disabled={activeStep === 0}
                     onClick={handleBack}
                     className={classes.button}
                     variant="contained" 
                  >뒤로
                  </Button>
                  {activeStep === steps.length - 1 ? 
                    <ActionButton/>
                    :
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}> 
                        다음 
                    </Button> }
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {/*{activeStep === steps.length && (
        <Paper square elevation={0} >
          <Button variant="contained" color='primary' onClick={handleClickOpen}>사용해 볼래요</Button>
        </Paper>
      )} */}
    </div>
  }
 
  return (
    <div class="godo">
      <div style={{'margin':'1%'}}>    
          숍리스트는 바쁘신 자영업자분들을 위해 문자 보내듯이 손쉽게 꾸밀 수 있는 홈페이지를 무료로 제공해 드려요!<br/>
          간단한 홈페이지를 통해 고객들에게 크고 작은 업데이트를 전달해 보세요 (영업시간 변경, 특별 할인, 새 메뉴 홍보 등)<br/><br/>
          단 11초만 투자해서 홈페이지를 만들어 보세요<br/><br/>
          <Grid container justify="center">
            <ActionButton/>
         </Grid>
          <br/>
          11초 안에 내 홈페이지 만드는 방법: <MyStepper/>
    
          {open && <SignUpDialog open={open} handleClose={handleClose} redirect={redirect}/>}   
          {bizId && <Redirect to={`/${bizId}`}/>} 
      </div>   
    </div>
  );
}

/*      <div style={{'margin-left':'-65%'}}>
<MyStepper/>
</div>

        <header className="App-header">  
       </header>

import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
} from '@material-ui/lab';

        const TimeLine = ()=>{
    const MyTimeLine = ({children})=>{
        return (
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot variant="outlined" color="primary"/>
                    <TimelineConnector />
                </TimelineSeparator> 
                <TimelineContent>
                    <Paper elevation={3}>
                        {children}
                    </Paper>
                </TimelineContent>
            </TimelineItem>
        )
      };

      return <Timeline align="left">
            <MyTimeLine>
                1. '사용해 볼래요' 버튼을 클릭하여 정보 입력<br/> (가게명, 아이디, 이메일, 비밀번호)
            </MyTimeLine>
            <MyTimeLine>
            2. shoplist.kr/'아이디' 로 본인의 홈페이지가 만들어집니다.<br/>
                (본인의 아이디가 abc 라면 홈페이지 주소는 &nbsp;
                 <a style={{'text-decoration': 'none'}} href='http://shoplist.kr/abc' target='_blank'>shoplist.kr/abc</a> 가 됩니다.
                클릭해서 샘플 홈페이지를 방문해 보세요) 
            </MyTimeLine>
            <MyTimeLine>
             3. 본인의 홈페이지로 이동
            </MyTimeLine>
            <MyTimeLine>
            4. 내용이 비어있으므로 '편집' 버튼을 눌러 고객들에게 보여질 내용 입력 <br/>
                    (회원가입 할때 입력한 비밀번호가 필요)
            </MyTimeLine>
            <MyTimeLine>
            6. 홈페이지 주소를 고객들에게 홍보해 주세요.
            </MyTimeLine>
            <MyTimeLine>
            7. 필요할 때마다 홈페이지 내용을 위의 4번과 같은 방법으로 간편히 업데이트 해주세요.
            </MyTimeLine>
        </Timeline>
  }

*/
