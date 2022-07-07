import CircleLoader from 'react-spinners/CircleLoader'

// css

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
}

function LoadingComponent() {
  return (
    <CircleLoader color='red' loading={true} cssOverride={override}>
      LoadingComponent
    </CircleLoader>
  )
}

export default LoadingComponent
