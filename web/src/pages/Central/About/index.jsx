import React, {Component} from 'react';
import './index.css'
import about_pic from '../../../images/about_img.png'
import shiming from '../../../images/about/target.png'
import yuanjing from '../../../images/about/yuanjing.png'
import jiazhi from '../../../images/about/shiming.png'
class About extends Component {
    state={
        about_dream:[
            {id:1,img:shiming,name:"使命",describe:"着力青年发展，推动青年生活公益化"},
            {id:2,img:yuanjing,name:"愿景",describe:"让青年成为世界的行动者"},
            {id:3,img:jiazhi,name:"价值观",describe:"努力学习，奋发向上，务实担当"},
        ]
    }
    render() {
        return (
            <div className="about_page">
                <div className="about_pic">
                    <img src={about_pic} alt=""/>
                    <span>关于我们</span>
                </div>
                <div className="about_what">
                    <h1>
                        什么是爱思青年？
                    </h1>
                    <p>爱思青年是一个社会公益组织，最初成立于2011年，由两岸三地专家学者、社会贤达所发起，
                        发起人有四川省社科院社会所前所长郭虹教授、台湾大学教务长冯燕教授、诗人阿野、香港青年领袖李家伦、
                        台湾资深社会工作者亘将、大陆英文教育专家周玉亮等，皆是具有多年从事社会服务的实践家。
                    </p>
                </div>
                <div className="about_belief">
                    <h1>我们的信仰</h1>
                    <p>我们相信青年人可以带动改变，青年的发展更是社会方向与社会创新的关键。我们支持青年人以多元及共创的精神，
                        走进时代变迁的社会需要里。从“个体发声”、“价值传递”到“行动实践”，发挥创意，扩散青年的社会参与力度，
                        使青年觉醒应有的社会责任，激发对公共事务议题的关心与投入，为个人、经济、社会和环境创造积极的改变，
                        以“I Think I Change”的思维，让智慧的光芒，激发新青年的梦想。
                    </p>
                    <ul className="about_dream">
                        {
                            this.state.about_dream.map((dreamObj)=>{
                                return(
                                    <li key={dreamObj.id}>
                                        <img src={dreamObj.img} alt="dream"/>
                                        <h3>{dreamObj.name}</h3>
                                        <span>{dreamObj.describe}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="about_contact">
                    <h3 className="contact_title">
                        我们为每一位青年发声
                    </h3>
                    <div className="contact_describe">
                        如果您在生活中遇到困难，或者在使用爱思青年公益网站中遇到什么问题，以及任何对平台发展有益的意见及建议，欢迎您直接写信到管理员邮箱：1374977935@qq.com。
                    </div>
                    <div className="contact_remind">
                        <span>为了您的来信我们能够第一时间进行处理，希望您在邮件中标注以下信息：</span>
                        <ul>
                            <li>您的联系方式（邮箱地址/电话 等）</li>
                            <li>相关问题、意见或建议的具体描述(各类支持性材料)</li>
                            <li>您的个人信息(年龄、姓名、工作单位 等)</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;