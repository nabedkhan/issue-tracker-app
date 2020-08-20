const activeIssue = document.getElementById('active-issue');
const closedIssue = document.getElementById('close-issue');
const totalIssue = document.getElementById('total-issue');

/// add new issue event listener
document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

/// submit new issue function
function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');

  const id = Math.floor(Math.random() * 100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];

  if (localStorage.getItem('issues')) {
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));
  document.getElementById('issueInputForm').reset();
  activeIssues(issues);
  totalIssues();
  fetchIssues();
  e.preventDefault();
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => parseInt(issue.id) === id);
  currentIssue.status = 'Closed';
  currentIssue.description = currentIssue.description.strike();
  localStorage.setItem('issues', JSON.stringify(issues));
  activeIssues(issues);
  closedIssues(issues);
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id != id);
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  activeIssues(remainingIssues);
  closedIssues(remainingIssues);
  totalIssues();
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const { id, description, severity, assignedTo, status } = issues[i];

    issuesList.innerHTML += `<div class=" col-xl-4 col-md-6">
    <div class="well px-5 py-5 mb-3 bg-white rounded">
      <h6 class="text-secondary">Issue ID: ${id} </h6>
      <p><span class="label label-info bg-info text-white px-2 rounded"> ${status} </span></p>
      <h3 class="text-success  font-weight-bold"> ${description} </h3>
      <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
      <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
      <a href="#" onclick="closeIssue(${id})" class="btn btn-warning mt-2">Close</a>
      <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger mt-2">Delete</a>
    </div>
  </div>`;
  }
}

function activeIssues(input) {
  const activeItems = input.filter(issue => issue.status === 'Open');
  activeIssue.innerText = activeItems.length;
  localStorage.setItem('Active Issues', activeItems.length);
}

function closedIssues(input) {
  const closedItems = input.filter(issue => issue.status === 'Closed');
  closedIssue.innerText = closedItems.length;
  localStorage.setItem('Closed Issues', closedItems.length);
}

function totalIssues() {
  const issues = JSON.parse(localStorage.getItem('issues'));
  totalIssue.innerText = issues.length;
  fetchIssues();
}
totalIssues();

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('Active Issues')) {
    activeIssue.innerText = localStorage.getItem('Active Issues');
  }
  if (localStorage.getItem('Closed Issues')) {
    closedIssue.innerText = localStorage.getItem('Closed Issues');
  }
});