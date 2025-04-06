import { useEffect } from "react";

const DisqusComments = ({ url, identifier, title }) => {
  useEffect(() => {
    const disqus_config = function () {
      this.page.url = url;
      this.page.identifier = identifier;
      this.page.title = title;
    };

    const script = document.createElement("script");
    script.src = "https://find-my-next-course.disqus.com/embed.js";
    script.setAttribute("data-timestamp", +new Date());
    script.async = true;

    const target = document.getElementById("disqus_thread");
    if (target) target.innerHTML = ""; // reset if navigating

    document.body.appendChild(script);

    return () => {
      const cleanup = document.getElementById("disqus_thread");
      if (cleanup) cleanup.innerHTML = "";
    };
  }, [url, identifier, title]);

  return (
    <div>
      <div id="disqus_thread"></div>
      <noscript>
        Please enable JavaScript to view the{" "}
        <a href="https://disqus.com/?ref_noscript">comments powered by Disqus</a>.
      </noscript>
    </div>
  );
};

export default DisqusComments;
