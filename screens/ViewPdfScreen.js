import React , {useState, useEffect} from 'react'
import { StyleSheet, View } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'
import Constants from 'expo-constants'
import { selectPdfUri } from '../slices/chatSlice'
import {useSelector} from "react-redux"

export default function ViewPdfScreen () {
    const pdfUri = useSelector(selectPdfUri)

    useEffect(() => {
        
    } , [pdfUri])
    return (
      <View style={styles.container}>
        {pdfUri && (
            <PDFReader
            source={{
              uri: pdfUri
            }}
          />
        )} 
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
})

