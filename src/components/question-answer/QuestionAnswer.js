import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const QuestionAnswer = (props) => {
  return(
    <div>
      Question Answer
    </div>
  )
}

export default connect(mapPropsFromState)(QuestionAnswer);