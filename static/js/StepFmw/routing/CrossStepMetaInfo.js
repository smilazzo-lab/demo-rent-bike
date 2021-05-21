export default class {

    static createMetaInfo (callLink,calledLink,edit_mode='vis',search_mode="search",title="no title") {
        return {
            callLink:callLink,
            calledLink:calledLink,
            edit_mode:edit_mode,
            search_mode:search_mode,
            title:title
        }
    }
}