export function Comment() {
  return (
    <div className='shadow-lg rounded-lg p-4 max-w-xs space-y-2 bg-bege-100'>
      <div className='flex flex-row justify-between items-center'>
        <h1 className='text-xl font-bold text-pear-400'>Luiz</h1>
        <span className='text-md text-pear-950'>14/jan/23</span>
      </div>

      <div className='flex direction-row items-center'>
        {/* <Star size={15} color='#1A652F' fill='#1A652F' weight='fill' />
        <Star size={15} color='#1A652F' weight='fill' />
        <Star size={15} color='#1A652F' weight='fill' />
        <Star size={15} color='#1A652F' weight='fill' />
        <Star size={15} color='#1A652F' /> */}
      </div>
      <p className='text-sm text-pear-950'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus ipsum,
        voluptas voluptatum neque reprehenderit vel. Dolor laborum nihil at
        incidunt ipsam veniam! Necessitatibus reprehenderit deleniti reiciendis
        impedit voluptates tempora odio?
      </p>
    </div>
  )
}
