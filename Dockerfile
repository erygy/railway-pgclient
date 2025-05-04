FROM postgres:16
CMD ["tail", "-f", "/dev/null"]

FROM postgres:16

RUN apt update && apt install -y bash

CMD ["bash"]
