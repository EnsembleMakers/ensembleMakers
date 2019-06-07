import React, { Component } from 'react';
import './ImageModal.scss';
import { FaAngleLeft, FaAngleRight, FaTimes } from 'react-icons/fa';
import { element } from 'prop-types';

class ImageModal extends Component {

  // 버튼으로 스크롤 이동
  scrollRight = (e) => {
    let body = document.querySelector(`#root > div > div:nth-child(2) > div:nth-child(2) > div.modal-wrapper > div > div > ${e}`)
    return body.scrollTo(body.scrollLeft+40, 0)
    // console.log('scrollWidth', body.scrollWidth)
    // console.log('clientwidth', body.clientWidth)
  }
  scrollLeft = (e) => {
    let body = document.querySelector(`#root > div > div:nth-child(2) > div:nth-child(2) > div.modal-wrapper > div > div > ${e}`)
    return body.scrollTo(body.scrollLeft-40, 0)
  }

  render() {
    const { images, imageURLs } = this.props;
    const { onChange, onPost, onDeleteURL, onDeleteImg, onHide } = this.props;
    const { scrollRight, scrollLeft } = this;

    let imageList;
    // image 만들기
    if(images){
      imageList = images
        .map((image, i) => {
          return(
          <div key={i} className="image-list-item">
            <div className="image-remove-button" onClick={() => {onDeleteImg(i)}}><FaTimes/></div>
            <img className="image-resize" src={`http://localhost:5000`+image}/>
          </div>
          // <img key={i} className="image-list-item" src={`http://localhost:5000`+image} onClick={() => {onDeleteImg(i)}}/>
          )
      })
    }

    // imgURL List 만들기
    let imageURLList = imageURLs
        .map((imageURL, i) => {
          return (
          <div className="image-preview-item" key={i}>
            <div className="image-remove-button" onClick={() => {onDeleteURL(i)}}><FaTimes/></div>
            <img className='image-resize' src={imageURL}/>
          </div>
          )
        })

    return(
      <div className="image-modal-wrapper">
        <div className="file-box">
          <input 
            type="button"
            value="+"
            className="file-button"
            />
          <input
            type="file"
            className="file-button-hidden"
            onChange={onChange}
            multiple
          />
        </div>
        <div className="preview-ref-text">사진을 추가하려면 + 버튼을 누르세요</div>
        <div className="image-preview-wrapper">
          <div className="right-button" onClick={() => scrollRight("div.image-preview-wrapper")}><FaAngleRight/></div>
          <div className="left-button" onClick={() => scrollLeft("div.image-preview-wrapper")}><FaAngleLeft/></div>
          {imageURLList}
        </div>
        <div className="image-modal-post-button" onClick={onPost}>올리기</div>
        <div className="list-ref-text">등록되어 있는 사진</div>
        <div className="image-list-wrapper">
          <div className="right-button" onClick={() => scrollRight("div.image-list-wrapper")}><FaAngleRight/></div>
          <div className="left-button" onClick={() => scrollLeft("div.image-list-wrapper")}><FaAngleLeft/></div>
          {imageList}
        </div>
        <div className="modal-cancel-button" onClick={onHide}><FaTimes/></div>
      </div>
    )
  }
}

export default ImageModal;