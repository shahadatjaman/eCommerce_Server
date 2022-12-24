const html = (code) => {
  return `<div style="width: 100%; background: #d2deea59; margin: 0 auto; padding: 1rem;">
    
   
    <h3>
    <span>Verification code : </span>
    <code> ${code}</code>
    </h3>
    </div>`;
};

module.exports = html;
