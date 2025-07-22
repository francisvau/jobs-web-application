
import AddReview from "./AddReview"
import FieldHeader from "../FieldHeader"
import IdSelector from "../IdSelector"
import { fetchField } from "../../fetch"
import { useState, useEffect } from "react"
import NoSelection from "../NoSelection"
import ReviewDetail from "./ReviewDetail"

const ReviewPage = ({ currentObj, setCurrentObj, showAdd, onShowAdd }) => {

  const [reviews, setReviews] = useState([])
  const [updateTrigger, setUpdateTrigger] = useState(false)

  const triggerListUpdate = () => {
    setUpdateTrigger(!updateTrigger)
  }

  useEffect(() => {
    const getReviewsObj = async () => {
      const reviewsObjFromServer = await fetchField("reviews")
      setReviews(reviewsObjFromServer.reviews)
    }
    getReviewsObj()
  }, [updateTrigger])

  return (
    <>
      <FieldHeader title="Reviews" showAdd={showAdd} onShowAdd={onShowAdd} />
      {showAdd && <AddReview updateTrigger={triggerListUpdate} onShowAdd={onShowAdd} />}
      <IdSelector setCurrentObj={setCurrentObj} list={reviews} field="reviews" keyName="text" />
      {Object.keys(currentObj).length
        ?
        <ReviewDetail currentObj={currentObj} setCurrentObj={setCurrentObj} triggerListUpdate={triggerListUpdate} />
        :
        <NoSelection name="review" />
      }
    </>
  )
}

export default ReviewPage
