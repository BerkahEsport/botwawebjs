import fs from 'fs'
import func from '../lib/func.js'
let handler = async ( m, { conn, } ) => {
     func.getFile("https://dl155.dlmate18.online/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ1duZGd6eVJRT0JPQnVxWmxrbk5Pb0l0MWNEN2NmaHJpbkhOZGE4VHZLWXB1c05SdWR2NVloQ1VDVjlzUXB2RHVCL3A1ekg4OTRXaFBIaStlM25td3oyeUhzY2MzWkFMcFRLQ1ZkcmxBd2xuUzF6N1NHbjFqVTRFZjdveHlVUkIwZC9EWWJiclBYOUpBVi9FMk5hdS8wMm9JQXVTK1M1OGNZamFEUDVWYWxsZUpzL3M1d1dIdDNlNVZlMHNla21lUEZ2MEpFMDhwT2d4cjE3L0d3VzVvM1R3PT0%3D", true, "OKE")
    }
handler.customPrefix = /^(tes|bot|p|P|hlo|halo|hai|Tes|permisi|oi|Hallo|Jawab bot|Hallo permisi|Oi)$/i
handler.command = new RegExp


handler.login = true
handler.text = true
export default handler 