import React, { useState } from 'react';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, subMonths, format } from 'date-fns';

const Filter = ({ onFilterChange, onExport }) => {
  const [dateRange, setDateRange] = useState('all');
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    let from, to;
    const now = new Date();
    if (range === 'thisWeek') {
      from = startOfWeek(now);
      to = endOfWeek(now);
    } else if (range === 'thisMonth') {
      from = startOfMonth(now);
      to = endOfMonth(now);
    } else if (range === 'last3Months') {
      from = startOfMonth(subMonths(now, 2));
      to = endOfMonth(now);
    } else if (range === 'custom') {
      from = customFrom ? new Date(customFrom) : null;
      to = customTo ? new Date(customTo) : null;
    } else {
      from = null;
      to = null;
    }
    onFilterChange({ dateFrom: from, dateTo: to, category: categoryFilter, search: searchTerm });
  };

  const handleCategoryChange = (category) => {
    setCategoryFilter(category);
    onFilterChange({ dateFrom: getDateFrom(), dateTo: getDateTo(), category, search: searchTerm });
  };

  const handleSearchChange = (search) => {
    setSearchTerm(search);
    onFilterChange({ dateFrom: getDateFrom(), dateTo: getDateTo(), category: categoryFilter, search });
  };

  const getDateFrom = () => {
    if (dateRange === 'thisWeek') return startOfWeek(new Date());
    if (dateRange === 'thisMonth') return startOfMonth(new Date());
    if (dateRange === 'last3Months') return startOfMonth(subMonths(new Date(), 2));
    if (dateRange === 'custom') return customFrom ? new Date(customFrom) : null;
    return null;
  };

  const getDateTo = () => {
    if (dateRange === 'thisWeek') return endOfWeek(new Date());
    if (dateRange === 'thisMonth') return endOfMonth(new Date());
    if (dateRange === 'last3Months') return endOfMonth(new Date());
    if (dateRange === 'custom') return customTo ? new Date(customTo) : null;
    return null;
  };

  return (
    <div className="card">
      <h2 className="section-title">
        <svg className="section-icon" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
        </svg>
        Filters
      </h2>

      <div className="filter-grid">
        <div className="form-group">
          <label className="form-label">Date Range</label>
          <div className="button-group">
            <button className={`btn ${dateRange === 'all' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => handleDateRangeChange('all')}>All Time</button>
            <button className={`btn ${dateRange === 'thisWeek' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => handleDateRangeChange('thisWeek')}>This Week</button>
            <button className={`btn ${dateRange === 'thisMonth' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => handleDateRangeChange('thisMonth')}>This Month</button>
            <button className={`btn ${dateRange === 'last3Months' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => handleDateRangeChange('last3Months')}>Last 3 Months</button>
            <button className={`btn ${dateRange === 'custom' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setDateRange('custom')}>Custom</button>
          </div>
          {dateRange === 'custom' && (
            <div className="custom-date">
              <input type="date" value={customFrom} onChange={(e) => { setCustomFrom(e.target.value); handleDateRangeChange('custom'); }} className="form-input" />
              <span>to</span>
              <input type="date" value={customTo} onChange={(e) => { setCustomTo(e.target.value); handleDateRangeChange('custom'); }} className="form-input" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select value={categoryFilter} onChange={(e) => handleCategoryChange(e.target.value)} className="form-input">
            <option value="all">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Salary">Salary</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Search</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="form-input"
            placeholder="Search transactions..."
          />
        </div>

        <div className="form-group">
          <button onClick={onExport} className="btn btn-secondary">
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;