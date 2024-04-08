import "./Image.css"

export const Image = (props) => {
    const {src, alt,width, height} = props;
    return <img src={src} alt={alt} width={width} height={height}  />
}