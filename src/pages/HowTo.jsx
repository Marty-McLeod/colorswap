import { HiQuestionMarkCircle } from "react-icons/hi";
import { HiMiniFaceSmile } from "react-icons/hi2";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import shared from "./sharedPageStyles.module.css";
import styles from "./HowTo.module.css";
import ImgResp from "../components/ImgResp";
import colorOptionsImage from "../assets/option-checkboxes-illustrated.jpg";
import colorOptionsExampleToggle from "../assets/checkbox-option-view-examples-illustrated.jpg";
import fileDragAndDrop from "../assets/drag-and-drop-box-example.jpg";
import colorswapRGBBasicExample from "../assets/colorswap-option-rgb-basic-example.png";
import colorswapPaletteChangeExample from "../assets/colorswap-option-palette-change-example.png";
import lightenColorExample from "../assets/lightening-hex-color-example.png";

function HowTo() {
    return (
        <div id="div-parent-layout" className={shared.parentDiv}>
            <PageNav/>
            <div className={`${styles.howto} ${shared.sharedPage}`}>
                <section>
                    <h1>How-to use the ColorSwap tool</h1>
                    <p>
                        ColorTool was designed to make modifying color values and color code formats across entire files a snap. For example, you can quickly convert one of several color code formats to another, avoiding the need to manually search & change values.
                    </p>
                    <p>
                        You can even convert standard cascading style sheet (CSS) color names to their RGB or to other numeric equivalent. (I.e., <code>limegreen</code> to <code>#32CD32</code> or <code>rgb(50, 205, 50)</code>)
                    </p>
                    <p>
                        You can submit a combination of program code and/or CSS styling code in files, typically in several different <strong>text-based</strong> formats:
                    </p>
                        <div id={styles.fileTable}>
                            <table id={styles.table}>
                                <thead>
                                    <tr>
                                        <th>File types</th>
                                        <th>Extensions</th>
                                    </tr>
                                    <tr>
                                        <td>CSS/SCSS styling sheet files</td>
                                        <td>.CSS, .SCSS, .module.css</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>HTML</td>
                                        <td>.HTML</td>
                                    </tr>
                                    <tr>
                                        <td>Standard text files & markdown</td>
                                        <td>.TXT, .MD</td>
                                    </tr>
                                    <tr>
                                        <td>Javascript (JS) and JSX</td>
                                        <td>.JS, .JSX</td>
                                    </tr>
                                    <tr>
                                        <td>Ruby, Python, C/C++ and others</td>
                                        <td>.RB, .PY, .C .CPP</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    <p>...and many more!</p>
                    <p>
                        The ColorSwap API will:
                        <ol>
                            <li>Check the uploaded files for a valid format & readability</li>
                            <li>Scan through each file & modify color code formats per options selected</li>
                            <li>Build a log file containing the results for each file & any invalid color codes found</li>
                            <li>Return the modified files + the log file results</li>
                        </ol>
                    </p>
                    <p>
                        If any color code formats are detected as being invalid for conversion, the tool will (1) ignore those values and (2) log the value & line number where found.
                    </p>
                    <h2>Color swap and lightening/darkening functions</h2>
                    <p>
                        In addition to converting one color format to another, you can also:
                        <ol>
                            <li>Increase or decrease the brightness value of all colors</li>
                            <li>Swap the red, green, or blue value components of any color code format</li>
                        </ol>
                    </p>
                    <h3>Swapping R/G/B values</h3>
                    <ImgResp imageDefault={colorswapPaletteChangeExample}/>
                    <p>This is particularly useful if you have existing code and you'd like to reuse it, but with different color schemes/palettes. By swapping R,G, or B color values, you are able to generate new colors immediately without any manual work.
                    </p>

                    <p>
                        Swapping color values can have a mild effect or a dramatic effect, depending on which RGB value has the highest level (i.e., 0-255 value or 0-100% value).
                    </p>
                    <p>
                        For example, swapping the red & blue values of <code>#0ABB0A</code> gives <code>#0ABB0A</code>, meaning the end result is the same. <strong>However,</strong> colors with a stronger primary color value <code>rgb(0, 255, 255)</code> (cyan) return a similarly strong color, simply "shifted" on the RGB color wheel: <code>rgb(255,255,0</code> (yellow).
                    </p>
                    <h3>Color brightness & darkness</h3>
                    <ImgResp imageDefault={lightenColorExample} />
                    <p>
                        RGB & hex color code formats have a "brightness" component which is controlled by the white value, adjusted by changing the value for adjacent colors. By increasing the RGB value for all color values, the color can be lightened or darkened.
                    </p>
                    <p>
                        10, 15, or 20% are often good values to work with. Colors cannot be reduced below 0 for RGB values and cannot exceed 100% (<code>#FF</code> or 255)
                    </p>
                    <h2>Uploading files for processing</h2>
                    <h3>1. Select your desired color options</h3>
                    <ImgResp imageDefault={colorOptionsImage}/>
                    <p>
                        You can pick as many color code conversion options as you'd like from the list of option checkboxes available. <strong>At least one option must be selected.</strong>
                    </p>
                    <p>
                        For the the lightness/darkening & RGB color swap functions, use the drop-down selection bar to choose the mode of operation. Lightness/darkness percentage valuues can be entered as 0 10 100.
                    </p>
                    <h4>Viewing examples of color code conversion outputs</h4>
                    <ImgResp imageDefault={colorOptionsExampleToggle}/>
                    <p>Click the "Show examples" toggle switch to see examples of how the tool will change color code formats in your files if enabled.</p>
                    <h3>2. Uploading files</h3>
                    <ImgResp imageDefault={fileDragAndDrop}/>
                    <p>
                        Add files to the upload queue by dragging and dropping one or more at a time. You can also click the drop box area to select files from your device.
                    </p>
                    <p>
                        Files will be displayed by name & type once uploaded. Click the Upload button to begin file processing.
                    </p>
                    <p>
                        Once complete, you'll receive a download notification and can save the files and log (.ZIP file) for use.
                    </p>
                </section>            
            </div>
            <Footer/>
        </div>
    )
}

export default HowTo;