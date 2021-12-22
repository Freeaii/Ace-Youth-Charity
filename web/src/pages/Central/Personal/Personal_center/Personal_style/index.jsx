import React, {Component,Fragment} from 'react';
import './index.css'
import {Link} from "react-router-dom";
import {message, Steps,Modal} from 'antd';
import axios from "axios";
import Notification from "../../Notice/Notification";

const { Step } = Steps;

class Personal_style extends Component {

    //根据状态判断显示状态，预留
    state={
        pic_front:"",
        pic_reserve:"",
        pic_info:"",
        visible:false,
        account_state:""
    }

    componentDidMount() {
        axios.get('/api/user/information').then(res=>{
            this.setState({
                account_state:res.data.account_state
            })
        })
    }

    //图片载入时进行判断
    beforeUpload=(file)=>{
        if(file){
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error("图片仅支持jpeg和png格式",2)
                return false
            }
            const isLt2M = file.size / 1024 / 1024 < 8;
            if (!isLt2M) {
                message.error("图片大小不允许超过4M",2)
                return false
            }
            return true
        }
    }

    //图片载入以及编码函数
    handleChange =(event,style,callback) => {
        const file=event.target.files[0]

        if(this.beforeUpload(file)){

            const reader=new FileReader();
            reader.readAsDataURL(file)
            reader.onload=()=>{
                //发送post请求将图片传到后端存储
                //返回base64编码或者暴露出来的url，前端再修改呈现
                 let result=reader.result
                callback(result,style)
            }
        }
    };

    changeClick=(e,click)=>{
        switch (click) {
            case 'pic_front':
                document.getElementById(click).click()
                break;
            case 'pic_reverse':
                document.getElementById(click).click()
                break;
            case 'pic_info':
                document.getElementById(click).click()
                break;
            default:
                break;
        }
    }
    callBackSave=(result,style)=>{
        switch (style) {
            case 'pic_front':
                this.setState({pic_front:result})
                break;
            case 'pic_reverse':
                this.setState({pic_reserve:result})
                break;
            case 'pic_info':
                this.setState({pic_info:result})
                break;
            default:
                break;
        }
    }

    saveImg=(e,style)=>{
        this.handleChange(e,style,this.callBackSave)
    }

    //提交图
    submit=()=>{
        let{pic_front,pic_reserve,pic_info}=this.state
        if(pic_info!==""&&pic_reserve!==""&&pic_front!==""){
            this.setState({visible:true})
        }else {
            message.destroy()
            message.error({
                content:"请检查是否存在资料未填写！",
                duration:2,
                style:{
                    marginTop:'120px'
                }
            })
        }
    }

    //提交材料
    postMaterial=()=>{
        let{pic_front,pic_reserve,pic_info}=this.state
        axios.post('/api/materials/organization',{pic_front,pic_reserve,pic_info}).then(res=>{
            message.success({
                content:res.data.success,
                duration:1,
                style:{
                    marginTop:'120px'
                },
                onClose:()=>{
                    this.setState({
                        visible:false,
                        pic_front:"",
                        pic_reserve:"",
                        pic_info:"",
                        account_state:"资质审核中"
                    })
                    //更改页面显示
                }
            })
        },({response})=>{
            message.error({
                content:response.data.errors,
                duration:1,
                style:{
                    marginTop:'120px'
                },
                onClose:()=>{
                    this.setState({
                        visible:false
                    })
                }
            })
        })
    }
    render() {
        let {pic_front,pic_reserve,pic_info,visible,account_state}=this.state
        return (
            <div className="personal_center_info_style">
                <div className="style_change_title">
                    <span className="about"><Link to='/personal/p_center/info' style={{color:'#999999'}}>账号详情</Link></span>
                    <svg className="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" >
                        <path
                            d="M761.6 489.6l-432-435.2c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l416 416-416 425.6c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l432-441.6C771.2 515.2 771.2 499.2 761.6 489.6z"/>
                    </svg>
                    <span>更改账号类型</span>
                </div>
                <div className="style_change_materials">
                    <div className="step">
                        <Steps current={account_state==="正式用户"?1:2}>
                            <Step title="个人账号" description="正式用户" />
                            <Step title="提交材料" description="提交相关佐证材料" />
                            <Step title="资质审核" description="大约需要3-5日" />
                            <Step title="公益组织" description="拥有发布公益信息权限" />
                        </Steps>
                    </div>
                    <div className="group_describe">
                        <ul>
                            <li>1."个人帐号"改为"公益组织"，均需保持上传的信息属实，且个人信息与机构法人或组织负责人为同一个人.</li>
                            <li>2.您需要提交身份证的正反面以及公益组织相关证明.</li>
                            <li>3.审核材料仅用于此次组织认证，我们不会滥用您的相关信息，并且会尽最大能力来保护您的账号隐私。</li>
                        </ul>
                    </div>
                    {
                        account_state==="正式用户"?
                            <Fragment>

                                <div className="materials_input">
                                    <span className="span">上传身份证</span>
                                    <p>注意: 左边上传身份证正面照，右边上传身份证反面，并且图片格式仅支持PNG和JPG，单图大小不超过8M</p>
                                    <div className="images">
                                        <div className="front" onClick={(e)=>{this.changeClick(e,'pic_front')}}>
                                            {
                                                pic_front===""?null:<img src={pic_front} alt=""/>
                                            }
                                            <input type="file" id="pic_front" style={{display:'none'}} onChange={(e)=>{this.saveImg(e,'pic_front')}}/>
                                            <svg viewBox="0 0 1024 1024" version="1.1"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M801.171 483.589H544V226.418c0-17.673-14.327-32-32-32s-32 14.327-32 32v257.171H222.83c-17.673 0-32 14.327-32 32s14.327 32 32 32H480v257.17c0 17.673 14.327 32 32 32s32-14.327 32-32v-257.17h257.171c17.673 0 32-14.327 32-32s-14.327-32-32-32z"
                                                    fill="#bfbfbf" />
                                            </svg>
                                        </div>
                                        <div className="reverse" onClick={(e)=>{this.changeClick(e,'pic_reverse')}}>
                                            {
                                                pic_reserve===""?null:<img src={pic_reserve} alt=""/>
                                            }
                                            <input type="file" id="pic_reverse" style={{display:'none'}} onChange={(e)=>{this.saveImg(e,'pic_reverse')}}/>
                                            <svg viewBox="0 0 1024 1024" version="1.1"
                                                 xmlns="http://www.w3.org/2000/svg" >
                                                <path
                                                    d="M801.171 483.589H544V226.418c0-17.673-14.327-32-32-32s-32 14.327-32 32v257.171H222.83c-17.673 0-32 14.327-32 32s14.327 32 32 32H480v257.17c0 17.673 14.327 32 32 32s32-14.327 32-32v-257.17h257.171c17.673 0 32-14.327 32-32s-14.327-32-32-32z"
                                                    fill="#bfbfbf" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="remark_info">
                                    <span className="span">上传其他材料</span>
                                    <p>例如: 带有组织申办人或者法人的图片格式材料,目前上传文件仅支持JPG、PNG格式且大小不超过8M的图片资源。</p>
                                    <div className="images" onClick={(e)=>{this.changeClick(e,'pic_info')}}>
                                        {
                                            pic_info===""?null:<img src={pic_info} alt=""/>
                                        }
                                        <input type="file" id="pic_info" style={{display:'none'}} onChange={(e)=>{this.saveImg(e,'pic_info')}}/>
                                        <svg viewBox="0 0 1024 1024" version="1.1"
                                             xmlns="http://www.w3.org/2000/svg" >
                                            <path
                                                d="M801.171 483.589H544V226.418c0-17.673-14.327-32-32-32s-32 14.327-32 32v257.171H222.83c-17.673 0-32 14.327-32 32s14.327 32 32 32H480v257.17c0 17.673 14.327 32 32 32s32-14.327 32-32v-257.17h257.171c17.673 0 32-14.327 32-32s-14.327-32-32-32z"
                                                fill="#bfbfbf" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="function_menus">
                                    <button><Link to='/personal/p_center/info' style={{color:"black"}}>取消</Link></button>
                                    <button className="bg" onClick={this.submit}>提交审核</button>
                                </div>
                                <Modal title="确认您的材料" centered visible={visible} width={500} onOk={this.postMaterial} onCancel={()=>{this.setState({visible:false})}}>
                                    您提交的材料，是否确认无误？
                                    如果您在提交材料过程中遇到了困难，可以联系邮箱：1374977935@qq.com
                                </Modal>
                            </Fragment>:null
                    }
                    {
                        account_state==="资质审核中"?<Notification check={true}/>:null
                    }
                </div>
            </div>
        );
    }
}

export default Personal_style;