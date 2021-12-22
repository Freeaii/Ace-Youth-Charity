import React, {Component} from 'react';
import {Modal} from "antd";
import './index.css'
import {emailCheck} from "../../dataDetection/login_data";
import axios from "axios";

class Footer extends Component {
    state={
        email:"",
    }
    onChange=(e)=>{
        this.setState({email:e.target.value})
    }

    sendEmail=()=>{
        const {email}=this.state
        if(emailCheck(email)){
            axios.post('/api/subscription',{email}).then(res=>{
                this.countDown('success',{
                    title: this.state.email+"订阅成功！",
                })
           },({response})=>{
                this.countDown('warning',{
                    title: response.data.errors,
                })
           })
        }else {
            this.countDown('error',{
                title: "邮箱检测有误，请输入正确的电子邮箱！",
            })
        }
    }
    //邮箱确认弹窗
    countDown=(state,data)=>{
        switch (state) {
            case "success":
                Modal.success({
                    title:data.title,
                    afterClose:()=>{
                        this.setState({email: ""})
                    }})
                break;
            case "error":
                Modal.error({
                    title:data.title,
                    afterClose:()=>{
                        this.setState({email: ""})
                    }})
                break;
            case "warning":
                Modal.warning({
                    title:data.title,
                    afterClose:()=>{
                        this.setState({email: ""})
                    }})
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div className="footer">
                <div className="follow_subscribe">
                    <div className="subscribe">
                        <div className="describe">
                            <span>订阅我们</span>
                            <p>我们会向您的邮箱推送最新的公益信息!</p>
                        </div>
                        <div className="mailbox">
                            <input type="text" onChange={this.onChange} value={this.state.email} placeholder="输入您的邮箱来订阅"/>
                            <button onClick={this.sendEmail}>
                                <svg t="1632496925787" className="icon" viewBox="0 0 1213 1024" version="1.1"
                                     xmlns="http://www.w3.org/2000/svg" p-id="19728">
                                    <path
                                        d="M1004.046124 568.908272l-379.622349 358.119266a54.421386 54.421386 0 0 0 0.26547 80.399538c23.778543 22.185722 62.195869 22.071949 85.822715-0.227546l470.3373-443.67651A56.886466 56.886466 0 0 0 1213.57794 510.580683a54.876477 54.876477 0 0 0-17.634804-41.489196L716.466076 16.844083A63.561145 63.561145 0 0 0 630.681286 16.578612a54.421386 54.421386 0 0 0-0.26547 80.437463L1010.038165 455.135341H56.886466a56.886466 56.886466 0 0 0 0 113.772931h947.159658z"
                                        p-id="19729"/>
                                </svg>
                            </button>
                        </div>
                        <div className="follow_us">
                            <span>关注我们</span>
                            <ul>
                                <li>
                                    <svg t="1632497144573" className="icon" viewBox="0 0 1024 1024" version="1.1"
                                         xmlns="http://www.w3.org/2000/svg" p-id="20690">
                                        <path
                                            d="M457.3 543c-68.1-17.7-145 16.2-174.6 76.2-30.1 61.2-1 129.1 67.8 151.3 71.2 23 155.2-12.2 184.4-78.3 28.7-64.6-7.2-131-77.6-149.2z m-52 156.2c-13.8 22.1-43.5 31.7-65.8 21.6-22-10-28.5-35.7-14.6-57.2 13.7-21.4 42.3-31 64.4-21.7 22.4 9.5 29.6 35 16 57.3z m45.5-58.5c-5 8.6-16.1 12.7-24.7 9.1-8.5-3.5-11.2-13.1-6.4-21.5 5-8.4 15.6-12.4 24.1-9.1 8.7 3.2 11.8 12.9 7 21.5zM785.3 443.5c15 4.8 31-3.4 35.9-18.3 11.8-36.6 4.4-78.4-23.2-109-27.6-30.6-68.4-42.3-106-34.3-15.4 3.3-25.2 18.4-21.9 33.8 3.3 15.3 18.4 25.2 33.8 21.8 18.4-3.9 38.3 1.8 51.9 16.7 13.5 15 17.2 35.4 11.3 53.3-4.9 15.1 3.2 31.1 18.2 36z"
                                            p-id="20691" fill="#d81e06"/>
                                        <path
                                            d="M885.1 237.5c-56.7-62.9-140.4-86.9-217.7-70.5-17.9 3.8-29.3 21.4-25.4 39.3 3.8 17.9 21.4 29.3 39.3 25.5 55-11.7 114.4 5.4 154.8 50.1 40.3 44.7 51.2 105.7 34 159.1-5.6 17.4 3.9 36 21.3 41.7 17.4 5.6 36-3.9 41.6-21.2v-0.1c24.1-75.4 8.9-161.1-47.9-223.9zM729 499c-12.2-3.6-20.5-6.1-14.1-22.1 13.8-34.7 15.2-64.7 0.3-86-28-40.1-104.8-37.9-192.8-1.1 0 0-27.6 12.1-20.6-9.8 13.5-43.5 11.5-79.9-9.6-101-47.7-47.8-174.6 1.8-283.5 110.6C127.3 471.1 80 557.5 80 632.2 80 775.1 263.2 862 442.5 862c235 0 391.3-136.5 391.3-245 0-65.5-55.2-102.6-104.8-118zM443 810.8c-143 14.1-266.5-50.5-275.8-144.5-9.3-93.9 99.2-181.5 242.2-195.6 143-14.2 266.5 50.5 275.8 144.4C694.4 709 586 796.6 443 810.8z"
                                            p-id="20692" fill="#d81e06"/>
                                    </svg>
                                </li>
                                <li>
                                    <svg t="1632497319924" className="icon" viewBox="0 0 1024 1024" version="1.1"
                                         xmlns="http://www.w3.org/2000/svg" p-id="21474">
                                        <path
                                            d="M913.64461 163.552785C894.667928 169.023541 874.665479 171.986866 853.922199 171.986866 756.645334 171.986866 674.299071 110.497857 641.645501 24.333463 636.003784 9.345873 620.731259 0.227948 604.77489 0.227948L419.22511 0.227948C403.268741 0.227948 387.996216 9.345873 382.297512 24.333463 349.700929 110.497857 267.297679 171.986866 170.077801 171.986866 149.334521 171.986866 129.332072 169.023541 110.35539 163.552785 83.115588 155.802549 56.103734 176.032946 56.103734 204.469475L56.103734 716.896878C56.103734 730.801714 63.170126 743.680784 74.795481 751.146085L490.344927 1016.990595C503.565919 1025.481663 520.434081 1025.481663 533.655073 1016.990595L949.204519 751.146085C960.829874 743.680784 967.896266 730.801714 967.896266 716.896878L967.896266 204.469475C967.896266 176.032946 940.884412 155.802549 913.64461 163.552785ZM526.246758 667.888029 445.667093 748.866604 365.087428 667.888029 365.087428 667.888029 203.871111 505.930881 284.450776 424.952307 445.667093 586.909455 768.04274 262.995158 848.622405 343.973733 526.246758 667.888029Z"
                                            p-id="21475" fill="#f4ea2a"/>
                                    </svg>
                                </li>
                                <li>
                                    <svg t="1632497357137" className="icon" viewBox="0 0 1024 1024" version="1.1"
                                         xmlns="http://www.w3.org/2000/svg" p-id="21875">
                                        <path
                                            d="M919.759462 318.994613c0-9.605475-0.184234-19.102577-0.608696-28.534655 41.060787-30.595551 76.68666-68.894629 104.863684-112.720738a403.247526 403.247526 0 0 1-120.68436 33.017692c43.401647-26.708567 76.68666-69.423851 92.415219-120.68436-40.638132 24.645865-85.589515 42.265535-133.383889 51.446549-38.295465-43.575045-92.944441-71.329413-153.358869-72.360764-116.027926-1.918205-210.084998 96.132418-210.084999 218.973404 0 17.460724 1.826088 34.394031 5.451171 50.745736-174.722834-11.243716-329.55016-102.190479-433.116978-239.293373-18.071226 32.847907-28.438925 71.237296-28.438925 112.377556 0 77.811934 37.090717 146.970271 93.44657 187.779994-34.500598-1.560574-66.819283-12.009553-95.166091-29.141545v2.85744c0 108.752474 72.440238 199.870827 168.560013 221.13003-17.621477 5.012259-36.207475 7.62044-55.322696 7.526516a191.542349 191.542349 0 0 1-39.500214-4.325895c26.708567 89.120675 104.332655 154.231274 196.231295 156.400543-71.923659 59.635948-162.525433 95.258208-260.892145 95.00895-16.960401 0-33.720311-1.137918-50.15149-3.200621 93.011271 63.80109 203.418242 100.960443 322.104923 100.960443 386.350343 0.092117 597.636477-336.191629 597.636477-627.962902z"
                                            fill="#1296db" p-id="21876"/>
                                    </svg>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="relevant_information">
                    <div className="privacy">
                        <span>隐私权限</span>
                        <ul>
                            <li>社区规范</li>
                            <li>用户隐私</li>
                            <li>服务条款</li>
                        </ul>
                    </div>
                    <div className="contact">
                        <span>联系我们</span>
                        <ul>
                            <li>QQ</li>
                            <li>微信</li>
                            <li>电话</li>
                        </ul>
                    </div>
                    <div className="help">
                        <span>获取帮助</span>
                        <ul>
                            <li>常见问题</li>
                        </ul>
                    </div>
                </div>
                <div className="declaration">
                    <p>Copyright © 2021 free.</p>
                    <p>All rights reserved 保留所有权利.</p>
                    <p><a href="https://beian.miit.gov.cn" target="_blank" rel="noreferrer">备案(蜀ICP备2021006530号)</a></p>
                </div>
            </div>
        );
    }
}

export default Footer;