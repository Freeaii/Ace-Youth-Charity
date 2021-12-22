import React, {Component} from 'react';
import './index.css'
import axios from "axios";
class Team extends Component {
    state={
        main:[],
        next:[]
    }
    componentDidMount() {
        let main=[],next=[];
        axios.get('/api/information/members').then(res=>{
            res.data.forEach((item)=>{
                switch (item.style) {
                    case 'main':
                        main.push(item)
                        break;
                    case 'next':
                        next.push(item)
                        break;
                    default:
                        break;
                }
            })
            this.setState({
                main,
                next
            })
        })
    }

    render() {
        const {main,next}=this.state
        return (
            <div className="team">
                <div className="team_head">
                    <div className="team_name">
                        <span>FCO团队</span>
                    </div>
                    <div className="team_words">
                        <p>一群有趣的人,做着一些有趣的事儿</p>
                    </div>
                </div>
                <div className="team_introduce">
                    <div className="team_describe">
                        <p>FCO的全称为Free Code Organization(自由编码组织)，它是一个非营利组织，仅仅作为部分程序员的聚集地。</p>
                    </div>
                    <div className="team_community">
                        <div className="community_title">
                            <h2>开源团队</h2>
                        </div>
                        <div className="community_describe">
                            <p>作为一个有趣的团队，任何人都可以为FCO做出贡献，无论你的兴趣领域或专业如何，我们坚信，你始终有你自己的独特之处。FCO为无数开源者带来了许多具有挑战性的难题，包括但不限于：</p>
                            <ul>
                                <li>视觉和用户体验设计</li>
                                <li>构建应用程序和服务</li>
                                <li>文稿设计</li>
                                <li>功能测试和用户测试</li>
                                <li>数据交互</li>
                                <li>社区支持和外联</li>
                            </ul>
                            <p>没有比成为FCO其中一员更为兴奋的事了，如果你想有所作为，帮助塑造互联网的未来，你就有一个地方可以加入！FCO社区是一个参与、好奇和乐于助人的集体，其行为守则旨在创造一个友好、安全和可接受、没有恐吓或骚扰的学术环境。</p>
                            <p>如果你想从0开始体验一个社区的成长，FCO社区或许是一个很好的开始。每隔一段时间我们将会举行虚拟会议，展示最新的社区项目、当前的FCG新闻和活动等。</p>
                        </div>
                    </div>
                    <div className="team_core">
                        <div className="team_core_title">
                            <h2>FCO核心团队</h2>
                        </div>
                        <div className="core_describe">
                            <p>虽然FCO主要是一个开源、社区驱动的项目，但社区优先事项由一个核心团队指导，该团队有助于确保战略路线和决定未来发展方向。</p>
                            <p>FCO核心团队的许多人员可能并不是专业的编码人员，但是这丝毫不影响他们发挥出自己的优势领域，我们希望在FCO和社区成员能够共同成长。</p>
                            <p>FCO核心团队组织灵活且反应灵敏，以适应随着时间的推移不断变化的优先事项，会随着项目进度和其他因素做出灵活的决策，核心组织的当前目标包括但不限于：</p>
                            <ul>
                                <li><span>视觉和用户体验设计</span>：为确保产品拥有良好的UI和UX体验，我们将会尽最大努力设计每一个页面的UI展现和UX交互。</li>
                                <li><span>数据采集</span>：确保现有的产品在开发完成后有一定的数据支撑，以及一些必要的数据用来测试。</li>
                                <li><span>Web页面的开发</span>：确保能够设计出一个强大、性能良好、易于使用的产品，我们一直奋斗在前线，不断地迭代社区Web端的功能和交互体验。</li>
                                <li><span>版本控制</span>：确保现有的FCO代码库和相关功能可以得到良好维护和迭代改进，以满足社区需求和未来目标。</li>
                            </ul>
                            <p>FCO核心团队默认严格执行公开讨论和沟通的政策，以最大限度地让社区成员都有参与和反馈的机会。这意味着致力于在面向公众、异步友好的渠道（如GitHub和FCG公众号）中沟通和讨论社区战略方向和其他高级别决策。例如，参与路线图和类似战略活动的呼吁将在FCG官网和其他公众平台上宣布，有关未来战略工作的建议和讨论可以在FCO官网中找到。</p>
                        </div>
                    </div>
                </div>
                <div className="team_members">
                    <div className="members_title">
                        <h2>团队成员</h2>
                    </div>
                    <div className="members_show">
                        <div className="core_members">
                            <h4>社区主要贡献者:</h4>
                            <ul>
                                {
                                    main.map((obj)=>{
                                        return(
                                            <li key={obj.id}>
                                                <img src={obj.head} alt="logo"/>
                                                <h5>{obj.name}</h5>
                                                <p>{obj.work}</p>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="other_contributors">
                            <h4>其他贡献人员:</h4>
                            <ul>
                                {
                                    next.map((obj)=>{
                                        return(
                                            <li key={obj.id}>
                                                <img src={obj.head} alt="logo"/>
                                                <h5>{obj.name}</h5>
                                                <p>{obj.work}</p>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Team;