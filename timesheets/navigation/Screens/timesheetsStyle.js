import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    ...ApplicationStyles,
    body: {
        flex: 1,
        backgroundColor: "white"
    },

    // List
    viewList: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15
    },

    // Item
    viewWrapItem: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 5
    },
    textTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: "grey"
    },
    textDescription: {
        fontSize: 8,
        color: "grey",
        marginTop: 10
    },
    textTime: {
        fontSize: 8,
        color: "grey",
        marginTop: 5
    },

    // Btn
    btnAddNew: {
        position: 'absolute',
        right: 20,
        bottom: 20
    }
})