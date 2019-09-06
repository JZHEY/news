import tpl from './index.tpl'
import './index.scss'
import {tplReplace} from '../../utils/tools'

export default () => {
    return{
        name:'header',
        tpl(options){
            console.log(options)
            return tpl().replace(tplReplace(),(node,key) => {
                return{
                    title:options.title,
                    showLeftIcon:options.showLeftIcon ? 'block':'none',
                    showRightIcon:options.showRightIcon ? 'block':'none',
                }[key]
            })
        }
    }
}