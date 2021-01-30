import React, { useState, useEffect, ChangeEvent } from 'react'
// Component expects value to be in formatted like: 'Jan. 2010 - Jan. 2012'

interface Props {
  value: string
  onChange: (value: string) => void
  label: string
}

const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
const years = () => {
  const yrs = []
  const date = new Date()
  for (let i = date.getFullYear() - 50; i <= date.getFullYear() + 1; i++) {
    yrs.push(i)
  }

  return yrs
}

const ResumeDateInput: React.FC<Props> = ({ value, onChange, label }) => {
  const [date, setDate] = useState({
    month1: 'Jan.',
    year1: '2010',
    month2: 'Aug.',
    year2: '2012',
    present: false
  })
  
  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    if (e.target.name === 'present') {
      setDate({ ...date, [e.target.name]: !date.present })
      return
    }
    e.preventDefault()
    setDate({ ...date, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (!value) {
      return
    }
    const split = value.split(' ')
    if (split.length === 5) {
      setDate({
        month1: split[0],
        year1: split[1],
        month2: split[3],
        year2: split[4],
        present: false
      })
    }
    if (split.length === 4 && split[3] === 'Present') {
      setDate({
        month1: split[0],
        year1: split[1],
        month2: 'Jan.',
        year2: '2014',
        present: true
      })
    }
  },[])

  useEffect(() => {
    let string = ''
    if (date.present) {
      string = `${date.month1} ${date.year1} - Present`
    } else {
      string = `${date.month1} ${date.year1} - ${date.month2} ${date.year2}`
    }
    onChange(string)
  }, [date])

  return (
    <div className="input">
      <label>{label}</label>
      <div className="input__date">
        <div className="input__date--group">
          <select value={date.month1} name="month1" onChange={handleChange}>
            {months.map((month) => {
              return (
                <option key={month} value={month}>{month}</option>
              )
            })}
          </select>
          <select value={date.year1} name="year1" onChange={handleChange}>
            {years().map((year) => {
              return (
                <option key={year} value={year}>{year}</option>
              )
            })}
          </select>
        </div>
        <div className="input__date--divider"> - </div>
        {!date.present ? (
          <div className="input__date--group">
            <select value={date.month2} disabled={date.present} name="month2" onChange={handleChange}>
              {months.map((month) => {
                return (
                  <option key={month} value={month}>{month}</option>
                )
              })}
            </select>
            <select value={date.year2} disabled={date.present} name="year2" onChange={handleChange}>
              {years().map((year) => {
                return (
                  <option key={year} value={year}>{year}</option>
                )
              })}
            </select>
          </div>
        ) : (
          <div className="input__date--group">
            <input value="Present" type="text" readOnly />
          </div>
        )}
        <div className="input__date--present">
          <label>
            <input
              checked={date.present}
              type="checkbox"
              name="present"
              style={{ width: 'unset', marginRight: '0.25rem' }}
              onChange={handleChange}
            />
            Present
          </label>
        </div>
      </div>
    </div>
  )
}

export default ResumeDateInput